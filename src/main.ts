import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LoadConfig } from './config/app.config';
import expressContext from 'express-request-context';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { INestApplication } from '@nestjs/common';
import { LoggerPkg } from './pkg/logger/logger.pkg';

class Server {
  constructor() {
    // Start Rest Server
    this.restServer();

    // Start Stream Server
    this.streamServer();
  }

  protected async restServer(): Promise<void> {
    await NestFactory.create<INestApplication>(AppModule, {}).then((r) => {
      r.use(expressContext());
      const swaggerConfig = new DocumentBuilder()
        .setTitle('Task Management API')
        .setDescription('The Task Management API Documentation')
        .setVersion('1.0')
        .addTag('Task Management')
        .build();
      const document = SwaggerModule.createDocument(r, swaggerConfig);
      SwaggerModule.setup('/api/docs', r, document);
      r.listen(LoadConfig().port).then(() => {
        const logger = r.get(LoggerPkg);
        logger.WithoutField().info('Starting restServer');
      });
    });
  }

  protected async streamServer(): Promise<void> {
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: LoadConfig().brokers.split(',', 10),
          clientId: 'nestjs-1',
        },
        consumer: {
          groupId: LoadConfig().consumerGroupId,
        },
      },
    }).then((r) => {
      r.listen().then(() => {
        const logger = r.get(LoggerPkg);
        logger.WithoutField().info('Starting streamServer');
      });
    });
  }
}

new Server();
