import joi from "joi";
import { ObjectId } from "mongodb";
import db from "../database/mongo.js";

const dataSchema = joi.object({
  data: joi.string().required(),
  valor: joi.number().required(),
  descricao: joi.string().trim().required(),
  type: joi.string().valid("entrada", "saida").required(),
});

async function adicionarDado(req, res) {
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
  if (req.body.valor > 0) {
    adicionarDado(req, res);
  } else {
    return res.status(401).send("invalido");
  }
}

export async function saida(req, res) {
  if (req.body.valor > 0) {
    adicionarDado(req, res);
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
