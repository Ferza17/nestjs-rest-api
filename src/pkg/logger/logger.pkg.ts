import { Injectable, Logger } from '@nestjs/common';
@Injectable()
export class LoggerPkg {
  private finalMessage: string;
  private logger = new Logger();

  WithField(requestID: string): this {
    this.finalMessage = `RequestID : ${requestID}`;
    return this;
  }

  WithoutField(): this {
    this.finalMessage = ``;
    return this;
  }

  Info(context: string, msg: string) {
    this.logger.log(`${this.finalMessage} ${msg}`, context);
  }
  Error(context: string, msg: string) {
    this.logger.error(`${this.finalMessage} ${msg}`, context);
  }
}
