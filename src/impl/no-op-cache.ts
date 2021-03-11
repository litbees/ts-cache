import { Cache } from '../cache.model';

export class NoOpCache implements Cache {
  readonly name: string;

  constructor(name: string) {
    this.name = name;
  }

  clear(): void {
    // do nothing.
  }

  evict(key: string): void {
    // do nothing.
  }

  get<T>(key: string): T | null {
    return null;
  }

  put<T>(key: string, value: T): void {
    // do nothing.
  }
}
