import bcrypt from "bcrypt";
import joi from "joi";
import { ObjectId } from "mongodb";
import db from "../database/mongo.js";

export async function entrada(req, res) {
  const { authorization } = req.headers;
  const { valor, descricao, type, data } = req.body;
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
      { $push: { extrato: { _id, data, valor, descricao, type } } }
    );
  res.sendStatus(201);
}
export async function extrato(req, res) {
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401);
  }

  const sessao = await db.collection("sessao").findOne({ token });
  if (!sessao) {
    return res.sendStatus(401);
  }
  const extrato = await db
    .collection("usuarios")
    .findOne({ _id: new ObjectId(sessao.userId) });
  res.send(extrato.extrato).status(200);
}
