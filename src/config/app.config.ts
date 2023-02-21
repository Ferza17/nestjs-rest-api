// export default ;
import * as Joi from 'joi';
import * as process from 'process';
import EnvironmentEnum from '../enum/environment.enum';

const LoadConfig = () => ({
  env: process.env.ENV,
  port: parseInt(process.env.PORT),
  consumerGroupId: process.env.CONSUMER_GROUP_ID,
  brokers: process.env.BROKERS,
  clientId: process.env.CLIENT_ID,
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
  CONSUMER_GROUP_ID: Joi.string().empty(),
  BROKERS: Joi.string().empty(),
  CLIENT_ID: Joi.string().empty(),
});

export { LoadConfig, ValidationSchema };
