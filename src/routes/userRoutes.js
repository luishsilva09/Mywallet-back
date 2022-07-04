import express from "express";
import {
  entrada,
  saida,
  extrato,
  deletar,
} from "../controllers/userController.js";
import validDataAdd from "../middlewares/validDataAdd.js";

const userRoutes = express.Router();

userRoutes.post("/entrada", validDataAdd, entrada);
userRoutes.post("/saida", validDataAdd, saida);
userRoutes.get("/extrato", extrato);
userRoutes.delete("/deletar/:id", deletar);

export default userRoutes;
