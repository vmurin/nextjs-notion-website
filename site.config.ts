import { siteConfig } from './lib/site-config'

export default siteConfig({
  // the site's root Notion page (required)
  rootNotionPageId: '629e5bbf1cef4a98b2b0dd6014719f83',

  // if you want to restrict pages to a single notion workspace (optional)
  // (this should be a Notion ID; see the docs for how to extract this)
  rootNotionSpaceId: null,

  // basic site info (required)
  name: 'Next.js Notion Starter Kit',
  domain: 'murin-online.de',
  author: 'Vlad Murin',

  // open graph metadata (optional)
  description: 'Vlad Murin - Freelancer IT Consultant',

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
  // pageUrlOverrides: {
  //   '/foo': '067dd719a912471ea9a3ac10710e7fdf',
  //   '/bar': '0be6efce9daf42688f65c76b89f8eb27'
  // }
  pageUrlOverrides: null,

  // whether to use the default notion navigation style or a custom one with links to
  // important pages. To use `headerNavigationLinks`, set `navigationStyle` to `custom`.
  // navigationStyle: 'default'
  navigationStyle: 'custom',
  headerNavigationLinks: [
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
      pageId: 'df1a0637c5344f97b0d1891d79049082'
    }
  ]
})
