import { Router } from "express";
import { signup, signin } from "../controllers/authController.js";
import { schemaValidate } from "../middlewares/schemaValidate.js";
import * as authSchema from "../schemas/authSchema.js";

const authRoutes = Router();

authRoutes.post("/signup", schemaValidate(authSchema.newUserSchema), signup);
authRoutes.post("/signin", signin);

export default authRoutes;
