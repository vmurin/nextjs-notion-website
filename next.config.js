// eslint-disable-next-line @typescript-eslint/no-var-requires
import bundleAnalyzer from '@next/bundle-analyzer'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

export default withBundleAnalyzer({
  staticPageGenerationTimeout: 300,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.notion.so',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'murin-online.de',
        port: '',
      },
      { protocol: 'https', hostname: 'www.notion.so' },
      { protocol: 'https', hostname: 'notion.so' }
    ],
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async rewrites() {
    // reverse proxy for posthog to overcome tracking blocker
    return [
      {
        source: "/ingest/static/:path*",
        destination: "https://eu-assets.i.posthog.com/static/:path*",
      },
      {
        source: "/ingest/:path*",
        destination: "https://eu.i.posthog.com/:path*",
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
  // convert CSS class names from kebab-case to camelCase
  webpack: (config) => {
    // camelCase style names from css modules
    config.module.rules
        .find(({oneOf}) => !!oneOf).oneOf
        .filter(({use}) => JSON.stringify(use)?.includes('css-loader'))
        .reduce((acc, {use}) => acc.concat(use), [])
        .forEach(({options}) => {
            if (options.modules) {
                options.modules.exportLocalsConvention = 'camelCase';
            }
        });

    // Workaround for ensuring that `react` and `react-dom` resolve correctly
    // when using a locally-linked version of `react-notion-x`.
    // @see https://github.com/vercel/next.js/issues/50391
    const dirname = path.dirname(fileURLToPath(import.meta.url))
    config.resolve.alias.react = path.resolve(dirname, 'node_modules/react')
    config.resolve.alias['react-dom'] = path.resolve(
      dirname,
      'node_modules/react-dom'
    )

    return config;
  },
  env: {
    NEXT_PUBLIC_BUILD_ID: `${process.env.AWS_BRANCH}-${process.env.AWS_COMMIT_ID}`,
  },

  // See https://react-tweet.vercel.app/next#troubleshooting
  transpilePackages: ['react-tweet']
})
