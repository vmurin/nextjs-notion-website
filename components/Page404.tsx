import type * as types from '@/lib/types'

import { PageHead } from './PageHead'
import styles from './styles.module.css'
import Link from 'next/link'
import Image from 'next/image'

export function Page404({ site, pageId, error }: types.PageProps) {
  const title = site?.name || 'Notion Page Not Found'

  return (
    <>
      <PageHead site={site} title={title} />

      <div className={styles.container}>
        <main className={styles.main}>
          <h1>Page Not Found</h1>

          {error ? (
            <p>{error.message}</p>
          ) : (
            pageId && (
              <p>
                Make sure that Notion page &quot;{pageId}&quot; is publicly
                accessible.
              </p>
            )
          )}

          <Link href="/">Return Home</Link>
          <Image
            src='/404.png'
            alt='404 Not Found'
            fill
            className={styles.errorImage}
          />
        </main>
      </div>
    </>
  )
}
