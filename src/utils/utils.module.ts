import { Module } from '@nestjs/common';
import { UuidUtil } from './uuid/uuid.util';

@Module({
  providers: [UuidUtil],
  exports: [UuidUtil],
})
export class UtilsModule {}
