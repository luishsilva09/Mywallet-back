import { ObjectId } from "mongodb";
import db from "../database/mongo.js";
import * as userService from "../service/userService.js";

export async function entrada(req, res) {
  try {
    const result = await userService.deposit(req.body, res.locals.sessao);

    res.status(result.code).send(result.message);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function saida(req, res) {
  try {
    const result = await userService.deposit(req.body, res.locals.sessao);

    res.status(result.code).send(result.message);
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
