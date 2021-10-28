import { Module, NestModule, MiddlewareConsumer} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import ConfigService from '@app/config';
import { DbModule } from '@app/db';
import { EmailModule } from '@app/email';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { LoggerMiddleware } from '../../middleware/logger.middleware';

@Module({
  imports: [
    DbModule,
    EmailModule,
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
