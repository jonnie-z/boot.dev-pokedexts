export class ApiCache {
    private cache = new Map<string, CacheEntry<any>>();
    private reapIntervalId: NodeJS.Timeout | undefined = undefined;
    private interval: number;

    constructor(interval: number) {
        this.interval = interval;
        this.startReapLoop();
    }

    add<T>(key: string, val: T) {
        const cacheEntry: CacheEntry<T> = {
            createdAt: Date.now(),
            val: val,
        }

        this.cache.set(key, cacheEntry);
    }

    get<T>(key: string) {
        const entry = this.cache.get(key);
        if (entry !== undefined) {
            return entry.val as T;
        }
        return undefined;
    }

    private reap() {
        for (const [key, entry] of this.cache) {
            if (entry.createdAt < (Date.now() - this.interval)) {
                this.cache.delete(key);
            }
        }
    }

    private startReapLoop() {
        this.reapIntervalId = setInterval(() => {
            this.reap();
        }, this.interval);
    }

    stopReapLoop() {
        clearInterval(this.reapIntervalId);
        this.reapIntervalId = undefined;
    }
}

export type CacheEntry<T> = {
    createdAt: number,
    val: T
}