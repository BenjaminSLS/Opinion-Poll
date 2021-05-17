const Joi = require("joi");

export const loginSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string()
    .min(6)
    .max(20)
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

export const registerSchema = Joi.object({
  username: Joi.string().min(3).max(12).alphanum(),
  email: Joi.string().email({ tlds: { allow: false } }),
  password: Joi.string().min(6).max(20),
});

export const addSchema = Joi.object({
  caption: Joi.string().min(4).max(50),
  tags: Joi.string().min(2).max(20),
  options: Joi.array().min(2),
});
