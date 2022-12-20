import { ObjectId } from "mongodb";
import db from "../database/mongo.js";

async function addData(itemData, res) {
  const sessao = res.locals.sessao;
  const { data, valor, descricao, type } = itemData;
  const _id = new ObjectId();
  await db
    .collection("usuarios")
    .updateOne(
      { _id: new ObjectId(sessao.userId) },
      { $push: { extrato: { _id, data, valor, descricao, type } } }
    );
  return res.sendStatus(201);
}

export async function entrada(req, res) {
  try {
    if (req.body.valor > 0) {
      addData(req.body, res);
    } else {
      return res.status(401).send("invalido");
    }
  } catch (err) {
    res.sendStatus(500);
  }
}

export async function saida(req, res) {
  try {
    if (req.body.valor > 0) {
      addData(req.body, res);
    } else {
      return res.status(401).send("invalido");
    }
  } catch {
    res.sendStatus(500);
  }
}

export async function extrato(req, res) {
  try {
    let total = 0;
    const sessao = res.locals.sessao;

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
  } catch {
    res.sendStatus(500);
  }
}

export async function deletar(req, res) {
  try {
    const idDado = req.params.id;
    const sessao = res.locals.sessao;

    await db
      .collection("usuarios")
      .updateOne(
        { _id: new ObjectId(sessao.userId) },
        { $pull: { extrato: { _id: new ObjectId(idDado) } } }
      );

    res.send("deletado").status(200);
  } catch {
    res.sendStatus(500);
  }
}
