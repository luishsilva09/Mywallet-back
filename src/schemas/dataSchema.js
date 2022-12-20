import joi from "joi";

export const dataSchema = joi.object({
  data: joi.string().required(),
  valor: joi.number().required(),
  descricao: joi.string().trim().required(),
  type: joi.string().valid("entrada", "saida").required(),
});
