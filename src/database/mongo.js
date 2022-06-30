import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const client = new MongoClient(process.env.URL_CONECT_MONGO);
await client.connect();
const db = client.db("mywallet-api");

export default db;
