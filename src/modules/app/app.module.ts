import { Module, NestModule, MiddlewareConsumer} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import ConfigService from '@app/config';
import { DbModule } from '@app/db';
import { EmailModule } from '@app/email';
// import { RedisModule } from '@app/redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { LoggerMiddleware } from '../../middleware/logger.middleware';
// import { RedisModule} from 'nestjs-redis';


@Module({
  imports: [
    DbModule,
    EmailModule,
    // RedisModule,
    // RedisModule.forRootAsync({
    //   useFactory: (configService) => configService.get('redis'),
    //   inject:[ConfigService]
    // }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
