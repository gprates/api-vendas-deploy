import Redis, { Redis as RedisClientType } from 'ioredis';
import cacheConfig from '@config/cache';

export default class RedisCache {
    private client: RedisClientType;

    constructor() {
        this.client = new Redis(cacheConfig.config.redis);
    }

    public async save(key: string, value:any): Promise<void> {
        console.log(key, value);
    }
}