import { Injectable } from '@nestjs/common';
import { LoggerPkg } from '../../../pkg/logger/logger.pkg';
import { RedisDatabase } from '../../../database/redis/redis.database';

@Injectable()
export class UserRedisRepository {
  constructor(private logger: LoggerPkg, private redisDb: RedisDatabase) {
    this.logger = logger;
    this.redisDb = redisDb;
  }
}
