import { Module } from '@nestjs/common';
import { PkgModule } from '../pkg/pkg.module';
import { UtilsModule } from '../utils/utils.module';
import { UserModule } from '../module/user/user.module';

@Module({
  imports: [PkgModule, UtilsModule, UserModule],
})
export class StreamModule {}
