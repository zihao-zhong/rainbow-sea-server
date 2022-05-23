// https://www.npmjs.com/package/nestjs-redis
// https://github.com/skunight/nestjs-redis/pull/85
// https://github.com/skunight/nestjs-redis/issues/82

// https://www.npmjs.com/package/@liaoliaots/nestjs-redis
// "nestjs-redis": "git+https://github.com/GyanendroKh/nestjs-redis.git#nest8-fix",

import { Module } from '@nestjs/common';
import { IRedisService } from './redis.service';
import { RedisModule } from 'nestjs-redis';
import { ConfigService } from '@nestjs/config';

// [ioredis] Unhandled error event: Error: read ECONNRESET

@Module({
  imports: [
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const redisConfig = configService.get('redis');
        return {
          ...redisConfig,
          connectTimeout: 10000,
          lazyConnect: true,
          onClientReady() {
            console.log('Redis 数据库连接成功', redisConfig.host, redisConfig.port);
          },
        };
      },
    }),
  ],
  providers: [IRedisService],
  exports: [IRedisService],
})
export class IRedisModule {}
