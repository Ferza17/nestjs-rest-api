import { Injectable, NestMiddleware } from '@nestjs/common';
import { UuidUtil } from '../../utils/uuid/uuid.util';
import { Request, Response } from 'express';
import HTTPHeader from '../../enum/header.enum';

@Injectable()
export class XRequestIDMiddleware implements NestMiddleware {
  constructor(private uuid: UuidUtil) {
    this.uuid = uuid;
  }
  use(req: Request, res: Response, next: () => void) {
    // Set Request Header to Request Context
    req.context.requestID = req.get(HTTPHeader.XRequestID)
      ? ''
      : this.uuid.GenerateUUID();
    next();
  }
}
