import { CacheManager } from './cache.manager';
import { SimpleCacheManager } from './simple-cache.manager';

let CACHE_MANAGER_INSTANCE: CacheManager = new SimpleCacheManager();

export function registerCacheManager(cacheManager: CacheManager): void {
  CACHE_MANAGER_INSTANCE = cacheManager;
}

export function getCacheManager(): CacheManager {
  return CACHE_MANAGER_INSTANCE;
}
