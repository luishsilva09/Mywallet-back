import joi from "joi";

export const newUserSchema = joi.object({
  name: joi.string().trim().required(),
  email: joi.string().email().trim().required(),
  password: joi.string().required(),
  repeat_password: joi.ref("password"),
});

export const userLoginSchema = joi.object({
  email: joi.string().trim().required().email(),
  password: joi.string().required().trim(),
});
