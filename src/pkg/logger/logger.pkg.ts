import { Injectable } from '@nestjs/common';
@Injectable()
export class LoggerPkg {
  private finalMessage: string;

  WithField(requestID: string): this {
    const now = new Date();
    const dateFormat =
      [now.getDate(), now.getMonth() + 1, now.getFullYear()].join('/') +
      ' ' +
      [now.getHours(), now.getMinutes(), now.getSeconds()].join(':');

    this.finalMessage = `Time: ${dateFormat} - RequestID : ${requestID}`;
    return this;
  }

  WithoutField(): this {
    const now = new Date();
    const dateFormat =
      [now.getDate(), now.getMonth() + 1, now.getFullYear()].join('/') +
      ' ' +
      [now.getHours(), now.getMinutes(), now.getSeconds()].join(':');

    this.finalMessage = `Time: ${dateFormat}`;
    return this;
  }

  Info(msg: string) {
    console.info(`\x1b[32m[INFO]\t`, `\x1b[0m${this.finalMessage}`, msg);
  }
  Error(msg: string) {
    console.error(`\x1b[31m[ERROR]\t`, `\x1b[0m${this.finalMessage}`, msg);
  }
}
