import { Injectable } from '@nestjs/common';
import { RedisService } from 'nestjs-redis';


/**
 * Redis 一些公共方法放置
 */
@Injectable()
export class IRedisService {
  constructor(
    private readonly redisService: RedisService,
  ) {}

  async setName() {
    const client = await this.redisService.getClient('test');
    const ret = client.set('name', 'like');
    console.log(ret);
  }

  async getName() {
    const client = await this.redisService.getClient('test');
    const name = client.get('name');
    console.log(name);
  }
}
