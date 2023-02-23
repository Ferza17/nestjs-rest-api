import { Injectable, NestMiddleware } from '@nestjs/common';
import { UuidUtil } from '../../utils/uuid.util';
import { Request, Response } from 'express';
import HTTPHeaderEnum from '../../enum/header.enum';

@Injectable()
export class XRequestIDMiddleware implements NestMiddleware {
  constructor(private uuid: UuidUtil) {
    this.uuid = uuid;
  }
  use(req: Request, res: Response, next: () => void) {
    // Set Request Header to Request Context
    req.context.RequestID = req.get(HTTPHeaderEnum.X_REQUEST_ID)
      ? ''
      : this.uuid.GenerateUUID();
    next();
  }
}
