import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoadConfig, ValidationSchema } from './config/app.config';
import { RestModule } from './rest/rest.module';
import { StreamModule } from './stream/stream.module';

@Module({
  imports: [
    RestModule,
    ConfigModule.forRoot({
      load: [LoadConfig],
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: ValidationSchema,
    }),
    StreamModule,
  ],
})
export class AppModule {}
