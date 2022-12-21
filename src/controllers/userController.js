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
    const result = await userService.statement(res.locals.sessao);
    res.status(result.code).send(result.message);
  } catch {
    res.sendStatus(500);
  }
}

export async function deletar(req, res) {
  try {
    const result = await userService.deleteItem(
      req.params.id,
      res.locals.sessao
    );
    res.status(result.code).send(result.message);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}
