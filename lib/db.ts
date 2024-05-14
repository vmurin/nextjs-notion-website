import Keyv from 'keyv'
import KeyvRedis from '@keyv/redis'

import { isRedisEnabled, redisNamespace, redisUrl } from './config'

let db: Keyv
if (isRedisEnabled) {
  console.log(`Using Redis at ${redisUrl}`)
  const keyvRedis = new KeyvRedis(redisUrl)
  db = new Keyv({ store: keyvRedis, namespace: redisNamespace || undefined })
  db.on('error', err => {
    console.log('Connection Error. Switching Redis off.', err)
    db.disconnect();
    db = new Keyv()
  });
} else {
  db = new Keyv()
}

export { db }
