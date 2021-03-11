import { CacheManager } from './cache.manager';
import { Cache } from './cache.model';

export class SimpleCacheManager implements CacheManager {
  private cacheMap: Map<string, Cache> = new Map<string, Cache>();

  constructor(caches?: Cache[]) {
    this.setCaches(caches);
  }

  getCacheNames(): string[] {
    return Array.from(this.cacheMap.keys());
  }

  getCache(name: string): Cache | null {
    return this.cacheMap.get(name) || null;
  }

  addCache(cache: Cache): void {
    this.cacheMap.set(cache.name, cache);
  }

  setCaches(caches?: Cache[]): void {
    this.cacheMap.clear();
    caches?.forEach(cache => this.addCache(cache));
  }
}
