// export default ;
import * as Joi from 'joi';
import * as process from 'process';
import EnvironmentEnum from '../enum/environment.enum';

const LoadConfig = () => ({
  env: process.env.ENV,
  port: parseInt(process.env.PORT),
  // Kafka
  consumerGroupId: process.env.CONSUMER_GROUP_ID,
  brokers: process.env.BROKERS,
  clientId: process.env.CLIENT_ID,
  // MongoDB
  mongoDbUser: process.env.MONGODB_USER,
  mongoDbPassword: process.env.MONGODB_PASSWORD,
  mongoDbHost: process.env.MONGODB_HOST,
  mongoDbPort: parseInt(process.env.MONGODB_PORT),
  mongoDbCollection: process.env.MONGODB_COLLECTION,
  // Redis
  redisHost: process.env.REDIS_HOST,
  redisPort: parseInt(process.env.REDIS_PORT),
  redisDb: parseInt(process.env.REDIS_DB),
});

const ValidationSchema = Joi.object({
  ENV: Joi.string()
    .valid(
      EnvironmentEnum.DEVELOPMENT,
      EnvironmentEnum.LOCAL,
      EnvironmentEnum.PRODUCTION,
    )
    .default(EnvironmentEnum.LOCAL),
  PORT: Joi.number().default(3000),
  // Kafka
  CONSUMER_GROUP_ID: Joi.string().empty(),
  BROKERS: Joi.string().empty(),
  CLIENT_ID: Joi.string().empty(),
  // MongoDB
  MONGODB_USER: Joi.string().empty(),
  MONGODB_PASSWORD: Joi.string().empty(),
  MONGODB_HOST: Joi.string().empty(),
  MONGODB_PORT: Joi.number().empty(),
  MONGODB_COLLECTION: Joi.string().empty(),
  // Redis
  REDIS_HOST: Joi.string().empty(),
  REDIS_PORT: Joi.number().empty(),
  REDIS_DB: Joi.number().empty(),
});

export { LoadConfig, ValidationSchema };
