import { Module } from '@nestjs/common';
import { PkgModule } from '../pkg/pkg.module';
import { UserModule } from '../module/user/user.module';

@Module({
  imports: [PkgModule, UserModule],
})
export class StreamModule {}
