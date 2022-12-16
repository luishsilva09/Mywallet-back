import express from "express";
import {
  entrada,
  saida,
  extrato,
  deletar,
} from "../controllers/userController.js";
import validDataAdd from "../middlewares/validDataAdd.js";
import validUser from "../middlewares/validUser.js";

const userRoutes = express.Router();

userRoutes.post("/entrada", validDataAdd, entrada);
userRoutes.post("/saida", validDataAdd, saida);
userRoutes.get("/statement", validUser, extrato);
userRoutes.delete("/deleteStatement/:id", validUser, deletar);

export default userRoutes;
