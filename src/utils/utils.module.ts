import { Module } from '@nestjs/common';
import { UuidUtil } from './uuid/uuid.util';
import { EncryptionUtil } from './encryption/encryption.util';

@Module({
  providers: [UuidUtil, EncryptionUtil],
  exports: [UuidUtil, EncryptionUtil],
})
export class UtilsModule {}
