import express from "express";
import { entrada, saida, extrato } from "../controllers/userController.js";
import validDataAdd from "../middlewares/validDataAdd.js";

const userRoutes = express.Router();

userRoutes.post("/entrada", validDataAdd, entrada);
userRoutes.post("/saida", validDataAdd, saida);
userRoutes.get("/extrato", extrato);

export default userRoutes;
