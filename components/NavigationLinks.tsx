import * as React from 'react'
import { NavigationLink } from "@/lib/site-config"
import { cs, useNotionContext } from 'react-notion-x'
import styles from './styles.module.css'

type Props = {
  children?: React.ReactNode[],
  navigationLinks: Array<NavigationLink | null>,
  classNames?: string
}

export const NavigationLinks: React.FC<Props> = ( {navigationLinks, classNames, children}) => {
  const { components, mapPageUrl } = useNotionContext()

  return (
        <div className={classNames}>
          {navigationLinks
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
            {children}
        </div>
  )
}
