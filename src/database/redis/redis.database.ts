import { Injectable, OnApplicationShutdown } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';
import { LoggerPkg } from '../../pkg/logger/logger.pkg';

@Injectable()
export class RedisDatabase implements OnApplicationShutdown {
  private connection: RedisClientType;
  constructor(
    private logger: LoggerPkg,
    private readonly host: string,
    private readonly port: number,
    private readonly db: number,
  ) {
    this.connection = createClient({
      database: db,
      url: `redis://${host}:${port}`,
    });
    this.connection.connect().catch((e) => {
      logger.WithoutField().error(`error connect to redis err : ${e}`);
    });
  }

  async onApplicationShutdown(signal?: string): Promise<any> {
    this.logger
      .WithoutField()
      .info(`shutting down Redis Connection SIGNAL ${signal}`);
    await this.connection.disconnect();
  }
}
