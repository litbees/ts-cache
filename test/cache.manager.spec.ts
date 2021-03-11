import { getCacheManager } from '../src/cache.instance';
import { MemoryCache } from '../src/impl/memory-cache';
import { SimpleCacheManager } from '../src';

describe('CacheManager', () => {
  it('should have a default CacheManager', () => {
    expect(getCacheManager()).toBeDefined();
    expect(getCacheManager()).toBeInstanceOf(SimpleCacheManager);
  });
  it('should configure SimpleCacheManager', () => {
    (getCacheManager() as SimpleCacheManager).addCache(new MemoryCache('simpleCache'));

    expect(getCacheManager().getCacheNames().length).toBe(1);
    expect(getCacheManager().getCacheNames()[0]).toBe('simpleCache');
  });
});
