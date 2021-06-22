import { IStorage } from './interface';

export class LocalStorage extends IStorage {
    private map = new Map<string, string>();

    // eslint-disable-next-line class-methods-use-this
    initialize(): Promise<void> {
        return Promise.resolve();
    }

    // eslint-disable-next-line class-methods-use-this
    close(): Promise<void> {
        return Promise.resolve();
    }

    async get(key: string): Promise<string | null> {
        const value = this.map.get(key);

        if (value) return value;

        return null;
    }

    async set(key: string, value: string): Promise<void> {
        this.map.set(key, value);
    }
}
