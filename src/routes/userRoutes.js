import express from "express";
import {
  deposit,
  expense,
  statement,
  deleteItem,
} from "../controllers/userController.js";
import { schemaValidate } from "../middlewares/schemaValidate.js";
import validUser from "../middlewares/validUser.js";
import * as dataSchema from "../schemas/dataSchema.js";

const userRoutes = express.Router();

userRoutes.post(
  "/deposit",
  schemaValidate(dataSchema.dataSchema),
  validUser,
  deposit
);
userRoutes.post(
  "/expense",
  schemaValidate(dataSchema.dataSchema),
  validUser,
  expense
);
userRoutes.get("/statement", validUser, statement);
userRoutes.delete("/deleteStatement/:id", validUser, deleteItem);

export default userRoutes;
