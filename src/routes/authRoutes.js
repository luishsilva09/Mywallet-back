import express from "express";
import { cadastro, login } from "../controllers/authController.js";

const authRoutes = express.Router();

authRoutes.post("/cadastro", cadastro);
authRoutes.post("/login", login);

export default authRoutes;
