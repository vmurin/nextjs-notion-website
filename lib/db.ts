import Keyv from '@keyvhq/core'
import KeyvRedis from '@keyvhq/redis'

import { isRedisEnabled, redisNamespace, redisUrl } from './config'

// `redisUrl` embeds REDIS_PASSWORD (see `redisUrl` in ./config), and this runs
// on every serverless cold start — logging it verbatim put the credential into
// CloudWatch in plaintext. Log only host:port, and never fall back to printing
// the raw URL if parsing fails.
function redactedRedisTarget(url: string | undefined): string {
  if (!url) return '<unset>'

  try {
    // URL.host is host:port; username/password are separate fields and dropped.
    return new URL(url).host || '<unparseable>'
  } catch {
    return '<unparseable>'
  }
}

let db: Keyv
if (isRedisEnabled) {
  console.log(`Using Redis at ${redactedRedisTarget(redisUrl)}`)
  const keyvRedis = new KeyvRedis(redisUrl!)
  db = new Keyv({ store: keyvRedis, namespace: redisNamespace || undefined })
  db.on('error', (err) => {
    console.log('Connection Error. Switching Redis off.', err)
    ;(db as any).disconnect?.()
    db = new Keyv()
  })
} else {
  db = new Keyv()
}

export { db }
