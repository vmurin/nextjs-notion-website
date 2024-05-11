import * as React from 'react'
import { NavigationLink } from "@/lib/site-config"
import { useNotionContext } from 'react-notion-x'

type Props = {
  link: NavigationLink,
  classNames?: string,
  newTab?: boolean
}
export const NavLink: React.FC<Props> = ( {link, classNames, newTab = false}) => {
  const { components, mapPageUrl } = useNotionContext()

    return (
    <span>
      {link.pageId && link.hash ? (
        <components.PageLink
          href={mapPageUrl(link.pageId) + '#' + link.hash}
          className={classNames}
          target={newTab? '_blank' : undefined}
          rel={newTab? 'noopener noreferrer' : undefined}
        >
          {link.title}
        </components.PageLink>
      ) : link.pageId ? (
        <components.PageLink
          href={mapPageUrl(link.pageId)}
          className={classNames}
          target={newTab? '_blank' : undefined}
          rel={newTab? 'noopener noreferrer' : undefined}
        >
          {link.title}
        </components.PageLink>
      ) : link.url ? (
        <components.Link href={link.url} className={classNames}>
          {link.title}
        </components.Link>
      ) : null}
    </span>
  )
}
