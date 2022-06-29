import express from "express";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import cors from "cors";
import joi from "joi";

dotenv.config();

const MAX_TEMPO_INATIVO = 10000;
let listaParticipantes = [];

const client = new MongoClient(process.env.URL_CONECT_MONGO);
let db;
client.connect().then(() => {
  db = client.db("batepapo-uol-api");
});

const app = express();
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT, () => console.log("Servidor online"));
