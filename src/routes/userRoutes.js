import express from "express";
import {
  entrada,
  saida,
  extrato,
  deletar,
} from "../controllers/userController.js";
import { schemaValidate } from "../middlewares/schemaValidate.js";
import validUser from "../middlewares/validUser.js";
import * as dataSchema from "../schemas/dataSchema.js";

const userRoutes = express.Router();

userRoutes.post(
  "/deposit",
  schemaValidate(dataSchema.dataSchema),
  validUser,
  entrada
);
userRoutes.post(
  "/expense",
  schemaValidate(dataSchema.dataSchema),
  validUser,
  saida
);
userRoutes.get("/statement", validUser, extrato);
userRoutes.delete("/deleteStatement/:id", validUser, deletar);

export default userRoutes;
