import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import joi from "joi";
import bcrypt from "bcrypt";

dotenv.config();

const client = new MongoClient(process.env.URL_CONECT_MONGO);
let db;
client.connect().then(() => {
  db = client.db("mywallet-api");
});

const app = express();
app.use(express.json());
app.use(cors());

const cadastroSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  repeat_password: joi.ref("password"),
});

app.post("/cadastro", async (req, res) => {
  try {
    const dados = req.body;
    const { error } = cadastroSchema.validate(dados, { abortEarly: false });

    if (error) {
      return res.sendStatus(422);
    }
    delete dados.repeat_password;
    await db
      .collection("usuarios")
      .insertOne({ ...dados, password: bcrypt.hashSync(dados.password, 10) });
    res.send("deu bom");
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post("/entrada", (req, res) => {});

app.post("/saida", (req, res) => {});
app.get("/extrato", (req, res) => {});

app.listen(process.env.PORT, () => console.log("Servidor online"));
