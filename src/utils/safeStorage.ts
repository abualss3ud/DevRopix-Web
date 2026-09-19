/**
 * Safe wrapper for localStorage and sessionStorage to prevent security exceptions in sandboxed iframes.
 */

class SafeStorage {
  private memoryStore: Record<string, string> = {};
  private isSupported: boolean;

  constructor(private type: 'local' | 'session') {
    this.isSupported = this.checkSupport();
  }

  private checkSupport(): boolean {
    try {
      if (typeof window === 'undefined') return false;
      const storage = this.getStorage();
      if (!storage) return false;
      const key = '__storage_test__';
      storage.setItem(key, key);
      const val = storage.getItem(key);
      storage.removeItem(key);
      return val === key;
    } catch {
      return false;
    }
  }

  private getStorage(): Storage | null {
    try {
      if (typeof window === 'undefined') return null;
      return this.type === 'local' ? window.localStorage : window.sessionStorage;
    } catch {
      return null;
    }
  }

  public getItem(key: string): string | null {
    if (this.isSupported) {
      try {
        return this.getStorage()!.getItem(key);
      } catch {
        // Fallback to memory
      }
    }
    return this.memoryStore[key] !== undefined ? this.memoryStore[key] : null;
  }

  public setItem(key: string, value: string): void {
    if (this.isSupported) {
      try {
        this.getStorage()!.setItem(key, value);
        return;
      } catch {
        // Fallback to memory
      }
    }
    this.memoryStore[key] = String(value);
  }

  public removeItem(key: string): void {
    if (this.isSupported) {
      try {
        this.getStorage()!.removeItem(key);
        return;
      } catch {
        // Fallback to memory
      }
    }
    delete this.memoryStore[key];
  }
}

export const safeLocalStorage = new SafeStorage('local');
export const safeSessionStorage = new SafeStorage('session');
