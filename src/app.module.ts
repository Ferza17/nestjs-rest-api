import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoadConfig, ValidationSchema } from './config/app.config';
import { RestModule } from './rest/rest.module';
import { StreamModule } from './stream/stream.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    RestModule,
    StreamModule,
    DatabaseModule,
    ConfigModule.forRoot({
      load: [LoadConfig],
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: ValidationSchema,
    }),
  ],
})
export class AppModule {}
