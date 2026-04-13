import { Database } from "bun:sqlite";

const db = new Database("db/app.db");

const delay = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 5000);
  });

export async function getUsers() {
  await delay();
  return db.query("SELECT * FROM users").all();
}
