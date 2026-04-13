import { Database } from "bun:sqlite";

const db = new Database("db/app.db");

export async function getUsers() {
  return db.query("SELECT * FROM users").all();
}
