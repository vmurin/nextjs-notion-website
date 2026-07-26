// Plain (non-module) stylesheet imports are handled by the bundler, not by TS.
// Next.js only declares `*.module.css` / `*.module.scss`, so side-effect imports
// like `import '@/styles/global.css'` need these wildcard declarations
// (TS2882 under moduleResolution: bundler).
declare module '*.css'
declare module '*.scss'
declare module '*.sass'
