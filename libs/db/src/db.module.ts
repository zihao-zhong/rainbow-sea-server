import { Module } from '@nestjs/common';
import { DtProviders } from './db.providers';

@Module({
  providers: [...DtProviders],
  exports: [...DtProviders],
})
export class DbModule {}
