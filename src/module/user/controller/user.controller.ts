import { Controller } from '@nestjs/common';
import { LoggerPkg } from '../../../pkg/logger/logger.pkg';

@Controller('/v1/user')
export class UserController {
  constructor(private logger: LoggerPkg) {
    this.logger = logger;
  }
}
