import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { cadastro, login } from "./controllers/authController.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/cadastro", cadastro);
app.post("/login", login);

app.post("/entrada", (req, res) => {});

app.post("/saida", (req, res) => {});
app.get("/extrato", (req, res) => {});

app.listen(process.env.PORT, () => console.log("Servidor online"));
