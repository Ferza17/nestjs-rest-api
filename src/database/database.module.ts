import { Module } from '@nestjs/common';
import { MongodbDatabase } from './mongodb/mongodb.database';
import { RedisDatabase } from './redis/redis.database';
import { PkgModule } from '../pkg/pkg.module';
import { ConfigModule } from '@nestjs/config';
import { LoadConfig, ValidationSchema } from '../config/app.config';
import { LoggerPkg } from '../pkg/logger/logger.pkg';

@Module({
  imports: [
    PkgModule,
    ConfigModule.forRoot({
      load: [LoadConfig],
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: ValidationSchema,
    }),
  ],
  providers: [
    {
      useFactory: (logger: LoggerPkg) => {
        return new MongodbDatabase(
          logger,
          LoadConfig().mongoDbUser,
          LoadConfig().mongoDbPassword,
          LoadConfig().mongoDbHost,
          LoadConfig().mongoDbPort,
          LoadConfig().mongoDbCollection,
        );
      },
      provide: MongodbDatabase,
      inject: [LoggerPkg],
    },
    {
      useFactory: (logger: LoggerPkg) => {
        return new RedisDatabase(
          logger,
          LoadConfig().redisHost,
          LoadConfig().redisPort,
          LoadConfig().redisDb,
        );
      },
      provide: RedisDatabase,
      inject: [LoggerPkg],
    },
  ],
})
export class DatabaseModule {}
