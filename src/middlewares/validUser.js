import db from "../database/mongo.js";
export default async function validUser(req, res, next) {
  const { authorization } = req.headers;

  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401);
  }
  const sessao = await db.collection("sessao").findOne({ token });
  if (!token || !sessao) {
    return res.sendStatus(401);
  }
  res.locals.sessao = sessao;
  next();
}
