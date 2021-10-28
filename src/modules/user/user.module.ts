import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProviders } from '@app/db';
import { EmailService } from '@app/email';

@Module({
  controllers: [UserController],
  providers: [UserService, EmailService, ...UserProviders],
})
export class UserModule {}
