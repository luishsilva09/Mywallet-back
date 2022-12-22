import { ObjectId } from "mongodb";
import db from "../database/mongo.js";
import { unauthorizedError } from "../utils/errorUtils.js";

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
    throw unauthorizedError("Dados invalidos");
  }
}

export async function expense(expenseData, sessao) {
  if (expenseData.valor > 0) {
    return addData(expenseData, sessao);
  } else {
    throw unauthorizedError("Dados invalidos");
  }
}

export async function statement(sessao) {
  let total = 0;
  const userData = await db
    .collection("usuarios")
    .findOne({ _id: new ObjectId(sessao.userId) });

  if (userData.extrato.length > 0) {
    userData.extrato.map((e) => {
      if (e.type === "entrada") {
        total += e.valor;
      } else {
        total -= e.valor;
      }
    });
  }
  const statement = { userData: userData.extrato, total };

  return { code: 200, message: statement };
}

export async function deleteItem(idItem, sessao) {
  await db
    .collection("usuarios")
    .updateOne(
      { _id: new ObjectId(sessao.userId) },
      { $pull: { extrato: { _id: new ObjectId(idItem) } } }
    );

  return { code: 200, message: "item deletado com sucesso" };
}
