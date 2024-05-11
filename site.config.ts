import { siteConfig } from './lib/site-config'

export default siteConfig({
  // the site's root Notion page (required)
  rootNotionPageId: '629e5bbf1cef4a98b2b0dd6014719f83',

  //privacy policy
  cookiePolicyLink: {
    title: 'Cookie-Richtlinie',
    pageId:'a012744c7b67412fb69b523432f44353',
    hash:'089ee90eb43b4c0cbdde6975fd265e14'
  },

  // if you want to restrict pages to a single notion workspace (optional)
  // (this should be a Notion ID; see the docs for how to extract this)
  rootNotionSpaceId: null,

  // basic site info (required)
  name: 'Vlad`s Murin personal Website',
  domain: 'murin-online.de',
  author: 'Vlad Murin',

  // open graph metadata (optional)
  description: 'Vlad Murin - Freelance IT Consultant',

  // social usernames (optional)
  //twitter: 'transitive_bs',
  github: 'vmurin',
  linkedin: 'vlad-murin',
  // newsletter: '#', // optional newsletter URL
  // youtube: '#', // optional youtube channel name or `channel/UCGbXXXXXXXXXXXXXXXXXXXXXX`

  // default notion icon and cover images for site-wide consistency (optional)
  // page-specific values will override these site-wide defaults
  defaultPageIcon: null,
  defaultPageCover: null,
  defaultPageCoverPosition: 0.5,

  // whether or not to enable support for LQIP preview images (optional)
  isPreviewImageSupportEnabled: true,

  // whether or not redis is enabled for caching generated preview images (optional)
  // NOTE: if you enable redis, you need to set the `REDIS_HOST` and `REDIS_PASSWORD`
  // environment variables. see the readme for more info
  isRedisEnabled: false,

  // map of notion page IDs to URL paths (optional)
  // any pages defined here will override their default URL paths
  // example:
  //
  pageUrlOverrides: {
    '/about': '130da9f6e9024380a008830fa0b2746f'
  },

  // pageUrlOverrides: null,

  // whether to use the default notion navigation style or a custom one with links to
  // important pages. To use `headerNavigationLinks`, set `navigationStyle` to `custom`.
  // navigationStyle: 'default'
  navigationStyle: 'custom',
  headerNavigationLinks: [
    {
      title: 'Home',
      pageId: '629e5bbf1cef4a98b2b0dd6014719f83'
    },
    {
      title: 'Über mich',
      pageId: '130da9f6e9024380a008830fa0b2746f'
    },
    {
      title: 'Projekte',
      pageId: '629e5bbf1cef4a98b2b0dd6014719f83',
      hash: '9502fa37c6f848eeb993ea2f556b53df'
    },
    {
      title: 'Kontakt',
      pageId: '70fec56d5e864ca6bce52b66c6051e46'
    }
  ],

  footerNavigationLinks: [
    {
      title: 'Impressum',
      pageId: '4f3c19c016a24760b05225a7132be196'
    },
    {
      title: 'Datenschutzerklärung',
      pageId: 'a012744c7b67412fb69b523432f44353',
    }
  ]
})
