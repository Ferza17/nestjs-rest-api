import { Module } from '@nestjs/common';
import { LoggerPkg } from './logger/logger.pkg';

@Module({
  providers: [LoggerPkg],
  exports: [LoggerPkg],
})
export class PkgModule {}
