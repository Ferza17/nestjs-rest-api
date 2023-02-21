// export default ;
import * as Joi from 'joi';
import * as process from 'process';
import EnvironmentEnum from '../enum/environment.enum';

const LoadConfig = () => ({
  env: process.env.ENV,
  port: parseInt(process.env.PORT),
});

const ValidationSchema = Joi.object({
  ENV: Joi.string()
    .valid(
      EnvironmentEnum.Development,
      EnvironmentEnum.Local,
      EnvironmentEnum.Production,
    )
    .default(EnvironmentEnum.Local),
  PORT: Joi.number().default(3000),
});

export { LoadConfig, ValidationSchema };
