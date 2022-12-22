import * as userService from "../service/userService.js";

export async function deposit(req, res) {
  const result = await userService.deposit(req.body, res.locals.sessao);
  res.status(result.code).send(result.message);
}

export async function expense(req, res) {
  const result = await userService.deposit(req.body, res.locals.sessao);
  res.status(result.code).send(result.message);
}

export async function statement(req, res) {
  const result = await userService.statement(res.locals.sessao);
  res.status(result.code).send(result.message);
}

export async function deleteItem(req, res) {
  const result = await userService.deleteItem(req.params.id, res.locals.sessao);
  res.status(result.code).send(result.message);
}
