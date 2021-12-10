import { Module, NestModule, MiddlewareConsumer} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import ConfigService from '@app/config';
import { DbModule } from '@app/db';
import { EmailModule } from '@app/email';
import { IRedisModule } from '@app/redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { LoggerMiddleware } from '../../middleware/logger.middleware';

@Module({
  imports: [
    DbModule,
    EmailModule,
    IRedisModule,
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
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
