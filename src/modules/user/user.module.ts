import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserProviders } from '@app/db';

@Module({
  controllers: [UserController],
  providers: [UserService, ...UserProviders],
})
export class UserModule {}
