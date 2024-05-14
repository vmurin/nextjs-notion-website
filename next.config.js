  // eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true'
})

module.exports = withBundleAnalyzer({
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
        hostname: '**.murin-online.de',
        port: '',
      }
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

    return config;
  },
})
