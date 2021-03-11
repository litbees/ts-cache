import { Cache } from '../cache.model';

export class StorageCache implements Cache {
  readonly name: string;
  private storage: Storage;

  constructor(name: string, storage: Storage) {
    this.name = name;
    this.storage = storage;
  }

  clear(): void {
    this.storage.clear();
  }

  evict(key: string): void {
    this.storage.removeItem(key);
  }

  get<T>(key: string): T | null {
    const value = this.storage.getItem(key);
    if (!value) {
      return null;
    }

    return (JSON.parse(value) as T) || null;
  }

  put<T>(key: string, value: T): void {
    this.storage.setItem(key, JSON.stringify(value));
  }
}
