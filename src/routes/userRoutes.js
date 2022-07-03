import express from "express";
import { entrada, saida, extrato } from "../controllers/userController.js";
import validDataAdd from "../middlewares/validDataAdd.js";
import cors from "cors";

const userRoutes = express.Router();
userRoutes.use(cors());

userRoutes.post("/entrada", validDataAdd, entrada);
userRoutes.post("/saida", saida);
userRoutes.get("/extrato", extrato);

export default userRoutes;
