export abstract class IStorage {
    abstract initialize(): Promise<void>;

    abstract close(): Promise<void>;

    abstract get(key: string): Promise<string | null>;

    abstract set(key: string, value: string): Promise<void>;
}
