// https://www.npmjs.com/package/nestjs-redis
// https://github.com/skunight/nestjs-redis/pull/85
// https://github.com/skunight/nestjs-redis/issues/82

import { Module } from '@nestjs/common';
import { IRedisService } from './redis.service';
import { RedisModule as NestRedisModule } from 'nestjs-redis';
import { ConfigService } from '@nestjs/config';


@Module({
  imports: [
    NestRedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        console.log(configService.get('redis'));
        return {
          ...configService.get('redis'),
          // host: '119.91.94.162',
          // port: 6379,
          // db: 1,
          // password: '1095996920Hao!',
          onClientReady() {
            console.log('Redis 数据库连接成功');
          },
        }
      },
      inject: [ConfigService],
    }),
  ],
  providers: [IRedisService],
  exports: [IRedisService],
})
export class RedisModule {}
