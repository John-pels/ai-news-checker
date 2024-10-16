interface CacheItem {
  data: unknown
  timestamp: number
}

const cache: { [key: string]: CacheItem } = {}
const CACHE_DURATION = 24 * 60 * 60 * 1000 // 24 hours

export function getFromCache(key: string) {
  const item = cache[key]
  if (item && Date.now() - item.timestamp < CACHE_DURATION) {
    return item.data
  }
  return null
}

export function setInCache(key: string, data: unknown) {
  cache[key] = {
    data,
    timestamp: Date.now(),
  }
}
