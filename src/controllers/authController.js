import bcrypt from "bcrypt";
import joi from "joi";
import db from "../database/mongo.js";
import { v4 as uuid } from "uuid";
import { ObjectId } from "mongodb";
import * as authService from "../service/authService.js";

export async function cadastro(req, res) {
  try {
    const result = await authService.signup(req.body);
    res.status(result.code).send(result.message);
  } catch (error) {
    res.sendStatus(500);
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const result = await authService.singin(email, password);

    res.status(result.code).send(result.message);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
