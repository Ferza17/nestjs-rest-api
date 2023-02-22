import { Injectable } from '@nestjs/common';
import mongoose, { Mongoose } from 'mongoose';
import { LoggerPkg } from '../../pkg/logger/logger.pkg';

@Injectable()
export class MongodbDatabase {
  private connection: Mongoose;

  constructor(
    private logger: LoggerPkg,
    private readonly user: string,
    private readonly password: string,
    private readonly host: string,
    private readonly port: number,
    private readonly collection: string,
  ) {
    this.logger = logger;
    this.user = user;
    this.password = password;
    this.host = host;
    this.port = port;
    this.collection = collection;
    const url = `mongodb://${this.user}:${this.password}@${
      this.host
    }:${this.port.toString()}/${this.collection}?authSource=admin`;
    mongoose.set('strictQuery', true);
    mongoose
      .connect(url)
      .then((r) => {
        this.connection = r;
      })
      .catch((err) => {
        logger.WithoutField().error(`error connect to mongoDB err : ${err}`);
      });
  }

  async Disconnect(): Promise<void> {
    await this.connection.disconnect();
  }
}
