import bcrypt from "bcrypt";
import joi from "joi";
import { ObjectId } from "mongodb";
import db from "../database/mongo.js";

export async function entrada(req, res) {
  const { authorization } = req.headers;
  const { valor, descricao } = req.body;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401);
  }
  const sessao = await db.collection("sessao").findOne({ token });
  if (!sessao) {
    return res.sendStatus(401);
  }
  const _id = new ObjectId();
  const usuario = await db
    .collection("usuarios")
    .updateOne(
      { _id: new ObjectId(sessao.userId) },
      { $push: { extrato: { valor, descricao, _id } } }
    );
  res.sendStatus(201);
}
