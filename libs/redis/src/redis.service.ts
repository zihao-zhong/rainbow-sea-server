import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';
import { KeyType, ValueType, Ok, Redis } from 'ioredis';

/**
 * Redis 一些公共方法放置
 * 方法参考 ioredis 的方法，注意传参类型和返回类型需要和 ioredis 保持一致
 */
@Injectable()
export class IRedisService {
  private client: Redis;

  constructor(
    private readonly redisService: RedisService,
  ) {
    this.getClient();
  }

  private getClient() {
    if (!this.client) {
      this.client = this.redisService.getClient();
    }
  }

  /**
   * @param key {KeyType} 键
   * @param value {ValueType} 值
   * @param expiryMode {string} 失效模式
   *        EX 过期时间单位是秒
   *        PX 过期时间单位是毫秒
   * @param time {number} 过期时间
   * @param setMode {number} 暂不知道这个参数的意义
   * @returns string | null
   */
  async set(
    key: KeyType,
    value: ValueType,
    expiryMode?: string,
    time?: number | string,
    // setMode?: number | string
  ): Promise<Ok | null> {
    return this.client.set(key, value, expiryMode, time);
  }

  /**
   * 
   * @param key {KeyType}
   * @returns 
   */
  async get(key: KeyType): Promise<string | null> {
    return this.client.get(key);
  }
}
