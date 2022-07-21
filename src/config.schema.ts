import * as Joi from 'joi';
export const configValidationSchema = Joi.object({
  STAGE: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(3306).required(),
  DB_USERNAME: Joi.string().required(),
  DB_PASSWORD: Joi.string().allow(null, ''),
  DB_DATABASE: Joi.string().required(),
  JWT_SECRET: Joi.string().required(),
});
