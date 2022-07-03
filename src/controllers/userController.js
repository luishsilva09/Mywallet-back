import joi from "joi";
import { ObjectId } from "mongodb";
import db from "../database/mongo.js";

async function addData(req, res) {
  const sessao = res.locals.sessao;
  const { data, valor, descricao, type } = res.locals.body;
  const _id = new ObjectId();
  const usuario = await db
    .collection("usuarios")
    .updateOne(
      { _id: new ObjectId(sessao.userId) },
      { $push: { extrato: { _id, data, valor, descricao, type } } }
    );
  return res.sendStatus(201);
}

export async function entrada(req, res) {
  if (res.locals.body.valor > 0) {
    addData(req, res);
  } else {
    return res.status(401).send("invalido");
  }
}

export async function saida(req, res) {
  if (res.locals.body.valor > 0) {
    addData(req, res);
  } else {
    return res.status(401).send("invalido");
  }
}

export async function extrato(req, res) {
  let total = 0;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  const sessao = await db.collection("sessao").findOne({ token });
  if (!token || !sessao) {
    return res.sendStatus(401);
  }
  const userData = await db
    .collection("usuarios")
    .findOne({ _id: new ObjectId(sessao.userId) });

  if (userData.extrato.length > 0) {
    userData.extrato.map((e) => {
      if (e.type === "entrada") {
        total += e.valor;
      } else {
        total -= e.valor;
      }
    });
  }
  const extrato = {
    userData: userData.extrato,
    total,
  };
  res.send(extrato).status(200);
}
