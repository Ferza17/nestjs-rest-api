import { Injectable, NestMiddleware } from '@nestjs/common';
import { GenerateUUID } from '../../utils/uuid.util';
import { Request, Response } from 'express';
import HTTPHeaderEnum from '../../enum/header.enum';

@Injectable()
export class XRequestIDMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    // Set Request Header to Request Context
    req.context.RequestID = req.get(HTTPHeaderEnum.X_REQUEST_ID)
      ? ''
      : GenerateUUID();
    next();
  }
}
