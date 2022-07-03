import express from "express";
import { cadastro, login } from "../controllers/authController.js";
import cors from "cors";

const authRoutes = express.Router();
authRoutes.use(cors());

authRoutes.post("/cadastro", cadastro);
authRoutes.post("/login", login);

export default authRoutes;
