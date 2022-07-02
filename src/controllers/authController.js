import bcrypt from "bcrypt";
import joi from "joi";
import db from "../database/mongo.js";
import { v4 as uuid } from "uuid";
import { ObjectId } from "mongodb";

export async function cadastro(req, res) {
  const cadastroSchema = joi.object({
    name: joi.string().trim().required(),
    email: joi.string().email().trim().required(),
    password: joi.string().required(),
    repeat_password: joi.ref("password"),
  });

  try {
    const userData = req.body;
    const { error } = cadastroSchema.validate(userData, { abortEarly: false });

    if (error) {
      return res.sendStatus(422);
    }

    const repeatUser = await db
      .collection("usuarios")
      .findOne({ email: userData.email });
    if (repeatUser) {
      return res.status(409).send("email já cadastrado");
    } else {
      delete userData.repeat_password;
      await db.collection("usuarios").insertOne({
        ...userData,
        password: bcrypt.hashSync(userData.password, 10),
        extrato: [],
      });
      res.sendStatus(201);
    }
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const usuario = await db.collection("usuarios").findOne({ email: email });
    if (usuario && bcrypt.compareSync(password, usuario.password)) {
      const token = uuid();
      await db
        .collection("sessao")
        .insertOne({ token, userId: new ObjectId(usuario._id) });
      res.send({ usuario, token });
    } else {
      res.status(401).send("email ou senha invalidos");
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
