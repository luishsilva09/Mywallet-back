import db from "../database/mongo.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { ObjectId } from "mongodb";
import { conflictError, unauthorizedError } from "../utils/errorUtils.js";

export async function signup(userData) {
  const HASH = 10;
  const repeatUser = await db
    .collection("usuarios")
    .findOne({ email: userData.email });

  if (repeatUser) throw conflictError("Dados Invalidos");

  delete userData.repeat_password;

  await db.collection("usuarios").insertOne({
    ...userData,
    password: bcrypt.hashSync(userData.password, HASH),
    extrato: [],
  });

  return { code: 201, message: "Usuario criado com sucesso" };
}

export async function singin(email, password) {
  const user = await db.collection("usuarios").findOne({ email: email });

  if (!user || !bcrypt.compareSync(password, user.password)) {
    throw unauthorizedError("email ou senha invalidos");
  }
  const token = uuid();
  await db
    .collection("sessao")
    .insertOne({ token, userId: new ObjectId(user._id) });

  return { code: 201, message: { user, token } };
}
