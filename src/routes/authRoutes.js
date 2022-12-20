import express from "express";
import { cadastro, login } from "../controllers/authController.js";
import { schemaValidate } from "../middlewares/schemaValidate.js";
import * as authSchema from "../schemas/authSchema.js";

const authRoutes = express.Router();

authRoutes.post("/signup", schemaValidate(authSchema.newUserSchema), cadastro);
authRoutes.post("/signin", login);

export default authRoutes;
