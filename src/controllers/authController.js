import * as authService from "../service/authService.js";

export async function signup(req, res) {
  const result = await authService.signup(req.body);
  res.status(result.code).send(result.message);
}

export async function signin(req, res) {
  const { email, password } = req.body;
  const result = await authService.singin(email, password);

  res.status(result.code).send(result.message);
}
