import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { cadastro, login } from "./controllers/authController.js";
import { entrada, saida, extrato } from "./controllers/userController.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.post("/cadastro", cadastro);
app.post("/login", login);

app.post("/entrada", entrada);

app.post("/saida", saida);
app.get("/extrato", extrato);

app.listen(process.env.PORT, () => console.log("Servidor online"));
