import express from "express";
import { cadastro, login } from "../controllers/authController.js";

const authRoutes = express.Router();

authRoutes.post("/signup", cadastro);
authRoutes.post("/signin", login);

export default authRoutes;
