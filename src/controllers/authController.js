import bcrypt from "bcrypt";
import joi from "joi";
import db from "../database/mongo.js";
import { v4 as uuid } from "uuid";
import { ObjectId } from "mongodb";

export async function cadastro(req, res) {
  try {
    const userData = req.body;

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

    const user = await db.collection("usuarios").findOne({ email: email });

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = uuid();
      await db
        .collection("sessao")
        .insertOne({ token, userId: new ObjectId(user._id) });
      res.send({ user, token });
    } else {
      res.status(401).send("email ou senha invalidos");
    }
  } catch (error) {
    res.sendStatus(500);
  }
}
