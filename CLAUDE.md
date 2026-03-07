# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Next.js 15 portfolio/blog website using **Notion as a headless CMS**. Content is managed in Notion and rendered using `react-notion-x`. Deployed primarily on Vercel with optional AWS Amplify support.

## Common Commands

```bash
# Development
npm run dev              # Start local dev server

# Production
npm run build            # Build for production
npm run start            # Start production server
npm run deploy           # Deploy to Vercel

# Testing & Linting
npm run test             # Run all tests (lint + prettier in parallel)
npm run test:lint        # ESLint only
npm run test:prettier    # Prettier check only

# Bundle Analysis
npm run analyze          # Build with bundle analysis
```

**Node version**: >= 22 required

## Architecture

### Data Flow
```
User Request → Next.js Router → getStaticProps
                                    ↓
                            resolveNotionPage()
                                    ↓
                            Notion API fetch
                                    ↓
                            NotionPage component
                                    ↓
                            react-notion-x renders
                                    ↓
                            Static HTML (ISR: 60s revalidation)
```

### Key Files

- **`site.config.ts`** - Primary configuration: Notion root page ID, site metadata, navigation links, URL overrides, feature flags
- **`lib/resolve-notion-page.ts`** - Core data fetching logic, converts page ID to rendered content
- **`lib/notion.ts`** - High-level Notion API wrapper (getPage, search, merge records)
- **`lib/config.ts`** - Centralized config access combining site.config.ts + environment variables
- **`pages/[pageId].tsx`** - Dynamic page rendering with SSG/ISR
- **`components/NotionPage.tsx`** - Main page renderer integrating react-notion-x

### Key Directories

- `pages/` - Next.js file-based routing
- `pages/api/` - API routes (search, social-image generation, page info)
- `components/` - React components
- `lib/` - Core utilities and Notion integration
- `styles/` - Global CSS, SCSS for Notion overrides, Prism theme

### URL Handling

- **Dev**: URLs include Notion ID suffix (e.g., `/page-slug-abc123`)
- **Prod**: Clean URLs (e.g., `/page-slug`)
- **Overrides**: `pageUrlOverrides` in site.config.ts for custom paths
- Add `Slug` property in Notion database to override auto-generated slugs

### Styling

- Global styles in `styles/global.css`
- Notion block overrides in `styles/notion.scss`
- CSS Modules with camelCase output (configured in next.config.js)
- Dark mode via `useDarkMode` hook, toggles `dark-mode` body class

### Caching & Performance

- Redis optional for preview image caching (`REDIS_HOST`, `REDIS_PASSWORD` env vars)
- ISR with 60-second revalidation on dynamic pages
- Preview images via `lqip-modern` (disable with `isPreviewImageSupportEnabled: false`)

## Environment Variables

Optional variables (see `.env.example`):
- `NEXT_PUBLIC_POSTHOG_KEY` - Analytics
- `TWITTER_ACCESS_TOKEN` - Tweet embedding
- `REDIS_HOST`, `REDIS_PASSWORD` - Cache layer

## Important Notes

- Notion page must be **public** for content to be fetched
- Vercel: Disable Deployment Protection for social image generation to work (returns 401 otherwise)
- The site uses `@texonom/nclient` (forked notion-client with search support)
- Social images generated via Vercel OG at `/api/social-image?id=<pageId>`
