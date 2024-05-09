import * as React from 'react'
import { NavigationLink } from "@/lib/site-config"
import { cs, useNotionContext } from 'react-notion-x'
import styles from './styles.module.css'

type Props = {
  headerNavigationLinks: Array<NavigationLink | null>,
  classNames?: string
}
export const NavigationLinks: React.FC<Props> = ( {headerNavigationLinks, classNames} ) => {
  const { components, mapPageUrl } = useNotionContext()

  return (
        <div className={classNames}>
          {headerNavigationLinks
            ?.map((link, index) => {
              if (!link.pageId && !link.url) {
                return null
              }

              if (link.pageId && link.hash) {
                return (
                  <components.PageLink
                    href={mapPageUrl(link.pageId) + '#' + link.hash}
                    key={index}
                    className={cs(styles.navLink, 'breadcrumb', 'button')}
                  >
                    {link.title}
                  </components.PageLink>
                )
              } else if (link.pageId) {
                return (
                  <components.PageLink
                    href={mapPageUrl(link.pageId)}
                    key={index}
                    className={cs(styles.navLink, 'breadcrumb', 'button')}
                  >
                    {link.title}
                  </components.PageLink>
                )
              } else {
                return (
                  <components.Link
                    href={link.url}
                    key={index}
                    className={cs(styles.navLink, 'breadcrumb', 'button')}
                  >
                    {link.title}
                  </components.Link>
                )
              }
            })
            .filter(Boolean)}
        </div>
  )
}
