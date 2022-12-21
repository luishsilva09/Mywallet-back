import * as authService from "../service/authService.js";

export async function signup(req, res) {
  try {
    const result = await authService.signup(req.body);
    res.status(result.code).send(result.message);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function signin(req, res) {
  try {
    const { email, password } = req.body;
    const result = await authService.singin(email, password);

    res.status(result.code).send(result.message);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
