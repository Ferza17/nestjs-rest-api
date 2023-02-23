import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggerPkg } from '../../pkg/logger/logger.pkg';
import { Request, Response } from 'express';
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: LoggerPkg) {
    this.logger = logger;
  }
  use(req: Request, res: Response, next: () => void) {
    // Gets the request log
    this.logger.WithField(req.context.RequestID).info(`LoggerMiddleware`);
    // Ends middleware function execution, hence allowing to move on
    if (next) {
      next();
    }
  }
}
