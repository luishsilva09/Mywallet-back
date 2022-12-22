import db from "../database/mongo.js";
import { unauthorizedError } from "../utils/errorUtils.js";
export default async function validUser(req, res, next) {
  const { authorization } = req.headers;

  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    throw unauthorizedError();
  }
  const sessao = await db.collection("sessao").findOne({ token });
  if (!token || !sessao) {
    throw unauthorizedError();
  }
  res.locals.sessao = sessao;
  next();
}
