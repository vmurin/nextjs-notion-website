import * as types from './types'

export interface SiteConfig {
  rootNotionPageId: string
  cookiePolicyLink: NavigationLink
  rootNotionSpaceId?: string

  name: string
  domain: string
  author: string
  description?: string
  language?: string

  twitter?: string
  github?: string
  linkedin?: string
  newsletter?: string
  youtube?: string

  defaultPageIcon?: string | null
  defaultPageCover?: string | null
  defaultPageCoverPosition?: number | null

  isPreviewImageSupportEnabled?: boolean
  isTweetEmbedSupportEnabled?: boolean
  isRedisEnabled?: boolean
  isSearchEnabled?: boolean

  includeNotionIdInUrls?: boolean
  pageUrlOverrides?: types.PageUrlOverridesMap
  pageUrlAdditions?: types.PageUrlOverridesMap

  navigationStyle?: types.NavigationStyle
  headerNavigationLinks?: Array<NavigationLink>
  footerNavigationLinks?: Array<NavigationLink>
  siteMapExcludeIds?: Array<string>
}

export interface NavigationLink {
  title: string
  pageId?: string
  url?: string
  hash?: string
}

export const siteConfig = (config: SiteConfig): SiteConfig => {
  return config
}
