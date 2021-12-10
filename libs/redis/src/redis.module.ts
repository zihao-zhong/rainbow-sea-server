// https://www.npmjs.com/package/nestjs-redis
// https://github.com/skunight/nestjs-redis/pull/85
// https://github.com/skunight/nestjs-redis/issues/82

// https://www.npmjs.com/package/@liaoliaots/nestjs-redis
// "nestjs-redis": "git+https://github.com/GyanendroKh/nestjs-redis.git#nest8-fix",

import { Module } from '@nestjs/common';
import { IRedisService } from './redis.service';
import { RedisModule } from 'nestjs-redis';
import { ConfigService } from '@nestjs/config';


@Module({
  imports: [
    RedisModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        console.log(configService.get('redis'));
        return {
          ...configService.get('redis'),
          tls: {
            host: configService.get('redis').host,
          },
          onClientReady() {
            console.log('Redis 数据库连接成功');
          },
        }
      },
    }),
    // 用于本地redis测试
    // RedisModule.register({
    //   host: '127.0.0.1',
    //   port: 6379,
    //   db: 0,
    //   password: '123456',
    //   onClientReady() {
    //     console.log('Redis 数据库连接成功');
    //   }
    // }),
  ],
  providers: [IRedisService],
  exports: [IRedisService],
})
export class IRedisModule {}
