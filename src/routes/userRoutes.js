import express from "express";
import { entrada, saida, extrato } from "../controllers/userController.js";

const userRoutes = express.Router();

userRoutes.post("/entrada", entrada);
userRoutes.post("/saida", saida);
userRoutes.get("/extrato", extrato);

export default userRoutes;
