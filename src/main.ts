import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LoadConfig } from './config/app.config';
import expressContext from 'express-request-context';
import { LoggerPkg } from './pkg/logger/logger.pkg';

class Server {
  private app: NestApplication;
  private logger: LoggerPkg;
  constructor() {
    this.bootstrap().then(() => {
      this.logger = this.app.get(LoggerPkg);

      // Start Rest Server
      this.restServer()
        .then(() => {
          this.logger.WithoutField().info('starting RestServer');
        })
        .catch((err) => {
          this.logger.WithoutField().error(`errRestServer err : ${err}`);
        });

      // Start Stream Server
      this.streamServer()
        .then(() => {
          this.logger.WithoutField().info('starting StreamServer');
        })
        .catch((err) => {
          this.logger.WithoutField().error(`errStreamServer err : ${err}`);
        });
    });
  }

  protected async bootstrap(): Promise<void> {
    this.app = await NestFactory.create(AppModule);
  }

  protected async restServer(): Promise<void> {
    this.app.use(expressContext());
    const swaggerConfig = new DocumentBuilder()
      .setTitle('Task Management API')
      .setDescription('The Task Management API Documentation')
      .setVersion('1.0')
      .addTag('Task Management')
      .build();
    const document = SwaggerModule.createDocument(this.app, swaggerConfig);
    SwaggerModule.setup('/api/docs', this.app, document);
    await this.app.listen(LoadConfig().port);
  }

  protected async streamServer(): Promise<void> {
    console.log('this method stands for kafka stream');
  }
}

new Server();
