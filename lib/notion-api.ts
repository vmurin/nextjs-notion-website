import { NotionAPI } from 'notion-client'

// Notion's private /api/v3 endpoints are POST requests, and ofetch (the
// transport used by notion-client) defaults `retry` to 0 for payload methods.
// That means a single 429 aborts the request, and during `next build` it takes
// the whole page — and therefore the deployment — down with it.
//
// Retry with capped exponential backoff plus jitter, honouring `Retry-After`
// when Notion sends it. Jitter matters here because pages are fetched
// concurrently: without it every in-flight request would retry in lockstep and
// hit the same limit again.
const MAX_RETRIES = 5
const MAX_RETRY_DELAY_MS = 30_000
const REQUEST_TIMEOUT_MS = 30_000

// Notion's edge blocks unauthenticated /api/v3 calls that carry a non-browser
// User-Agent: `User-Agent: node` — the default Node's global `fetch` sends, and
// therefore what ofetch sends — comes back 403 Forbidden even for a public
// page, while the very same request with a browser UA returns 200. That turned
// every ISR revalidation into a 500 on the live site. Send a browser UA so the
// request is served.
export const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

// 429 is already in ofetch's default list, but spell the set out so the intent
// survives a transport change.
const RETRY_STATUS_CODES = [408, 409, 425, 429, 500, 502, 503, 504]

// Minimal shape of ofetch's FetchContext. `ofetch` is a transitive dependency
// of notion-client, so it is not resolvable from here under pnpm.
type RetryContext = {
  response?: { headers: Headers }
  options: { retry?: number | false }
}

function getRetryDelay({ response, options }: RetryContext): number {
  // ofetch passes the remaining retry count, decrementing it after this call.
  const remaining = typeof options.retry === 'number' ? options.retry : 0
  const attempt = Math.max(0, MAX_RETRIES - remaining)

  const retryAfterSeconds = Number(response?.headers.get('retry-after'))
  const base =
    Number.isFinite(retryAfterSeconds) && retryAfterSeconds > 0
      ? retryAfterSeconds * 1000
      : 1000 * 2 ** attempt

  return Math.min(MAX_RETRY_DELAY_MS, base + Math.random() * 500)
}

export const notion = new NotionAPI({
  apiBaseUrl: process.env.NOTION_API_BASE_URL,
  ofetchOptions: {
    headers: { 'User-Agent': USER_AGENT },
    timeout: REQUEST_TIMEOUT_MS,
    retry: MAX_RETRIES,
    retryStatusCodes: RETRY_STATUS_CODES,
    retryDelay: getRetryDelay
  }
})
