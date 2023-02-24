import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LoadConfig } from './config/app.config';
import expressContext from 'express-request-context';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {
  INestApplication,
  INestMicroservice,
  ValidationPipe,
} from '@nestjs/common';
import { LoggerPkg } from './pkg/logger/logger.pkg';

class Server {
  constructor() {
    // Start Rest Server
    this.restServer();
    // Start Stream Server
    this.streamServer();
  }

  protected async restServer(): Promise<void> {
    let server: INestApplication;
    try {
      server = await NestFactory.create<INestApplication>(AppModule, {});
      server.use(expressContext());
      server.useGlobalPipes(new ValidationPipe());
      server.enableShutdownHooks();
      const swaggerConfig = new DocumentBuilder()
        .setTitle('Task Management API')
        .setDescription('The Task Management API Documentation')
        .setVersion('1.0')
        .addTag('Task Management')
        .build();
      const document = SwaggerModule.createDocument(server, swaggerConfig);
      SwaggerModule.setup('/api/docs', server, document);
      await server.listen(LoadConfig().port);
      server
        .get(LoggerPkg)
        .WithoutField()
        .Info('restServer', 'Starting restServer');
    } catch (e) {
      server
        .get(LoggerPkg)
        .WithoutField()
        .Error('restServer', 'error restServer');
    }
  }

  protected async streamServer(): Promise<void> {
    let server: INestMicroservice;
    try {
      server = await NestFactory.createMicroservice<MicroserviceOptions>(
        AppModule,
        {
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
        },
      );
      server.enableShutdownHooks();
      server.useGlobalPipes(new ValidationPipe());
      await server.listen();
      server
        .get(LoggerPkg)
        .WithoutField()
        .Info('streamServer', 'Starting streamServer');
    } catch (e) {
      server
        .get(LoggerPkg)
        .WithoutField()
        .Error('streamServer', 'error streamServer');
    }
  }
}

new Server();
