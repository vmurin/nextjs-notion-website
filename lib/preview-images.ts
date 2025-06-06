import ky from 'ky'
import {
  type ExtendedRecordMap,
  type PreviewImage,
  type PreviewImageMap
} from 'notion-types'
import { getPageImageUrls, normalizeUrl } from 'notion-utils'
import pMap from 'p-map'
import pMemoize from 'p-memoize'

import { defaultPageCover, defaultPageIcon } from './config'
import { db } from './db'
import { mapImageUrl } from './map-image-url'

export async function getPreviewImageMap(
  recordMap: ExtendedRecordMap
): Promise<PreviewImageMap> {
  const urls: string[] = getPageImageUrls(recordMap, {
    mapImageUrl
  })
    .concat([defaultPageIcon, defaultPageCover])
    .filter(Boolean)

  const previewImagesMap = Object.fromEntries(
    await pMap(
      urls,
      async (url) => {
        const cacheKey = normalizeUrl(url)
        return [cacheKey, await getPreviewImage(url, { cacheKey })]
      },
      {
        concurrency: 8
      }
    )
  )

  return previewImagesMap
}

let lqip: typeof import('lqip-modern') // dynamic import
async function createPreviewImage(
  url: string,
  { cacheKey }: { cacheKey: string }
): Promise<PreviewImage | null> {
  if (!lqip) {
    lqip = await import('lqip-modern')
  }
  try {
    try {
      const cachedPreviewImage = await db.get(cacheKey)
      if (cachedPreviewImage) {
        return cachedPreviewImage
      }
    } catch (err) {
      // ignore redis errors
      console.warn(`redis error get "${cacheKey}"`, err.message)
    }

    const body = await ky(url).arrayBuffer()
    const result = await lqip.default(body)
    console.log('lqip', { ...result.metadata, url, cacheKey })

    const previewImage = {
      originalWidth: result.metadata.originalWidth,
      originalHeight: result.metadata.originalHeight,
      dataURIBase64: result.metadata.dataURIBase64
    }

    try {
      await db.set(cacheKey, previewImage)
    } catch (err) {
      // ignore redis errors
      console.warn(`redis error set "${cacheKey}"`, err.message)
    }

    return previewImage
  } catch (err) {
    console.warn('failed to create preview image', url, err.message)
    return null
  }
}

export const getPreviewImage = pMemoize(createPreviewImage)
