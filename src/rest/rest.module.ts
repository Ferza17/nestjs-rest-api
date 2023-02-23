import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PkgModule } from '../pkg/pkg.module';
import { UserModule } from '../module/user/user.module';
import { XRequestIDMiddleware } from './middleware/xRequestID.middleware';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [PkgModule, UserModule],
})
export class RestModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(XRequestIDMiddleware, LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
