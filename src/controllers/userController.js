import bcrypt from "bcrypt";
import joi from "joi";
import { ObjectId } from "mongodb";
import db from "../database/mongo.js";

async function adicionarDado(req, res) {
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
  return res.sendStatus(201);
}

export async function entrada(req, res) {
  adicionarDado(req, res);
}

export async function saida(req, res) {
  adicionarDado(req, res);
}

export async function extrato(req, res) {
  let total = 0;
  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");
  if (!token) {
    return res.sendStatus(401);
  }

  const sessao = await db.collection("sessao").findOne({ token });
  if (!sessao) {
    return res.sendStatus(401);
  }
  const dados = await db
    .collection("usuarios")
    .findOne({ _id: new ObjectId(sessao.userId) });

  if (dados.extrato.length > 0) {
    dados.extrato.map((e) => {
      if (e.type === "entrada") {
        total += e.valor;
      } else {
        total -= e.valor;
      }
    });
  }
  const extrato = {
    dados: dados.extrato,
    total,
  };
  res.send(extrato).status(200);
}
