import * as userService from "../service/userService.js";

export async function deposit(req, res) {
  try {
    const result = await userService.deposit(req.body, res.locals.sessao);

    res.status(result.code).send(result.message);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
}

export async function expense(req, res) {
  try {
    const result = await userService.deposit(req.body, res.locals.sessao);

    res.status(result.code).send(result.message);
  } catch {
    res.sendStatus(500);
  }
}

export async function statement(req, res) {
  try {
    const result = await userService.statement(res.locals.sessao);
    res.status(result.code).send(result.message);
  } catch {
    res.sendStatus(500);
  }
}

export async function deleteItem(req, res) {
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
