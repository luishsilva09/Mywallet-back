import joi from "joi";
import db from "../database/mongo.js";

export default async function validDataAdd(req, res, next) {
  const dataSchema = joi.object({
    data: joi.string().required(),
    valor: joi.number().required(),
    descricao: joi.string().trim().required(),
    type: joi.string().valid("entrada", "saida").required(),
  });
  const { authorization } = req.headers;
  const { valor, descricao, type, data } = req.body;

  const { error } = dataSchema.validate(req.body);
  if (error) {
    return res.sendStatus(401);
  }

  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401);
  }
  const sessao = await db.collection("sessao").findOne({ token });
  if (!sessao) {
    return res.sendStatus(401);
  }
  res.locals.sessao = sessao;
  res.locals.body = req.body;

  next();
}
