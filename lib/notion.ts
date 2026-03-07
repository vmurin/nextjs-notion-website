import {
  type ExtendedRecordMap,
  type SearchParams,
  type SearchResults
} from 'notion-types'
import { mergeRecordMaps } from 'notion-utils'
import pMap from 'p-map'
import pMemoize from 'p-memoize'

import {
  isPreviewImageSupportEnabled,
  headerNavigationLinks,
  navigationStyle
} from './config'
import { getTweetsMap } from './get-tweets'
import { notion } from './notion-api'
import { NotionAPI } from '@texonom/nclient' // fixed client for search
import {
  type SearchParams as TexonomSearchParams,
  type SearchResults as TexonomSearchResults
} from '@texonom/ntypes'


import { getPreviewImageMap } from './preview-images'

const searchAPI = new NotionAPI()
const getNavigationLinkPages = pMemoize(
  async (): Promise<ExtendedRecordMap[]> => {
    const navigationLinkPageIds = (headerNavigationLinks || [])
      .map((link) => link?.pageId)
      .filter(Boolean)

    if (navigationStyle !== 'default' && navigationLinkPageIds.length) {
      return pMap(
        navigationLinkPageIds,
        async (navigationLinkPageId) =>
          notion.getPage(navigationLinkPageId, {
            chunkLimit: 1,
            fetchMissingBlocks: false,
            fetchCollections: false,
            signFileUrls: false
          }),
        {
          concurrency: 4
        }
      )
    }

    return []
  }
)

export async function getPage(pageId: string): Promise<ExtendedRecordMap> {
  let recordMap = await notion.getPage(pageId)

  if (navigationStyle !== 'default') {
    // ensure that any pages linked to in the custom navigation header have
    // their block info fully resolved in the page record map so we know
    // the page title, slug, etc.
    const navigationLinkRecordMaps = await getNavigationLinkPages()

    if (navigationLinkRecordMaps?.length) {
      recordMap = navigationLinkRecordMaps.reduce(
        (map, navigationLinkRecordMap) =>
          mergeRecordMaps(map, navigationLinkRecordMap),
        recordMap
      )
    }
  }

  if (isPreviewImageSupportEnabled) {
    const previewImageMap = await getPreviewImageMap(recordMap)
    ;(recordMap as any).preview_images = previewImageMap
  }

  await getTweetsMap(recordMap)

  return recordMap
}

export async function search(params: SearchParams): Promise<SearchResults> {
  // Transform notion-types SearchParams to @texonom/ntypes SearchParams
  // notion-types uses 'ancestorId', @texonom/ntypes uses 'spaceId'
  const texonomParams: TexonomSearchParams = {
    spaceId: params.ancestorId,
    query: params.query,
    limit: params.limit,
    filters: params.filters ? {
      isDeletedOnly: params.filters.isDeletedOnly,
      excludeTemplates: params.filters.excludeTemplates,
      navigableBlockContentOnly: params.filters.isNavigableOnly,
      requireEditPermissions: params.filters.requireEditPermissions
    } : undefined
  }

  const results = await searchAPI.search(texonomParams) as TexonomSearchResults

  // Transform results back to notion-types format
  return {
    recordMap: results.recordMap as any,
    results: results.results.map(r => ({
      id: r.id,
      isNavigable: r.isNavigable,
      score: r.score,
      highlight: {
        pathText: r.highlight?.pathText || '',
        text: r.highlight?.text || ''
      }
    })),
    total: results.total
  }
}
