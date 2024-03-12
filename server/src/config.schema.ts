import * as Joi from 'joi';

export const configSchema = Joi.object({
  PORT: Joi.number(),
  MONGO_CONNECTION_STRING: Joi.string(),
  BRIGHTLY_URL_BASE: Joi.string(),
});
