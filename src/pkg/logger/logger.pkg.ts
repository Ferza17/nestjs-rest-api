import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerPkg {
  private message: messageLogger;

  WithField(requestID: string): messageLogger {
    const now = new Date();
    const dateFormat =
      [now.getDate(), now.getMonth() + 1, now.getFullYear()].join('/') +
      ' ' +
      [now.getHours(), now.getMinutes(), now.getSeconds()].join(':');

    this.message = new messageLogger();
    this.message.finalMessage = `[Time: ${dateFormat}] requestID : ${requestID}`;
    return this.message;
  }

  WithoutField(): messageLogger {
    const now = new Date();
    const dateFormat =
      [now.getDate(), now.getMonth() + 1, now.getFullYear()].join('/') +
      ' ' +
      [now.getHours(), now.getMinutes(), now.getSeconds()].join(':');

    this.message = new messageLogger();
    this.message.finalMessage = `[Time: ${dateFormat}]`;
    return this.message;
  }
}

class messageLogger {
  public finalMessage: string;

  info(msg: string) {
    console.info(this.finalMessage, msg);
  }
  error(msg: string) {
    console.error(this.finalMessage, msg);
  }
}
