import { Module } from '@nestjs/common';
import { UuidUtil } from './uuid.util';
import { EncryptionUtil } from './encryption.util';
import { Exception } from '../exception/exception';

@Module({
  providers: [UuidUtil, EncryptionUtil, Exception],
  exports: [UuidUtil, EncryptionUtil],
})
export class UtilsModule {}
