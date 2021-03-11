import {
  CacheDefaults,
  CacheKey,
  CachePut,
  CacheRemove,
  CacheRemoveAll,
  CacheResult,
  CacheValue,
} from '../src/cache.decorator';
import { MemoryCache } from '../src/impl/memory-cache';
import { StorageCache } from '../src/impl/storage-cache';
import { SimpleCacheManager } from '../src/simple-cache.manager';
import { registerCacheManager } from '../src';

@CacheDefaults('cacheBean')
class CacheBean {
  @CachePut()
  put(@CacheKey() id: number, @CacheValue() value: any): void {}

  @CacheResult()
  get(id: number): any {
    return null;
  }

  @CacheRemove()
  clear(id: number): void {}

  @CacheRemoveAll()
  clearAll(): void {}
}

class FakeStorage implements Storage {
  private values: any = {};

  [name: string]: any;

  get length(): number {
    return Object.keys(this.values).length;
  }

  getItem(key: string): string | null {
    return this.values[key];
  }

  key(index: number): string | null {
    return Object.keys(this.values)[index];
  }

  removeItem(key: string): void {
    delete this.values[key];
  }

  setItem(key: string, value: string): void {
    this.values[key] = value;
  }

  clear(): void {
    this.values = {};
  }
}

describe('CacheDecorator', () => {
  beforeEach(() => {});

  it('should throw an error if no cache declared', () => {
    const bean: CacheBean = new CacheBean();

    expect(function () {
      bean.put(1, 2);
    }).toThrowError();
  });

  it('should not has an injector', () => {
    const bean: CacheBean = new CacheBean();

    [new MemoryCache('cacheBean'), new StorageCache('cacheBean', new FakeStorage())].forEach(cache => {
      registerCacheManager(new SimpleCacheManager([cache]));

      bean.put(1, 'put');
      bean.put(2, 'put2');

      expect(bean.get(2)).toBe('put2');

      expect(bean.get(3)).toBeNull();

      bean.clear(2);
      expect(bean.get(2)).toBeNull();

      expect(bean.get(1)).toBe('put');

      bean.clearAll();
      expect(bean.get(1)).toBeNull();
    });
  });
});
