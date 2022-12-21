import { ObjectId } from "mongodb";
import db from "../database/mongo.js";

async function addData(itemData, sessao) {
  const { data, valor, descricao, type } = itemData;
  const _id = new ObjectId();
  await db
    .collection("usuarios")
    .updateOne(
      { _id: new ObjectId(sessao.userId) },
      { $push: { extrato: { _id, data, valor, descricao, type } } }
    );

  return { code: 201, message: "Dado adicionado com sucesso" };
}

export async function deposit(depositData, sessao) {
  if (depositData.valor > 0) {
    return addData(depositData, sessao);
  } else {
    return { code: 401, message: "Dados invalidos" };
  }
}
