import Database from "better-sqlite3";

const db = new Database("db/app.db");

const delay = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 5000);
  });

export async function getUsers(name) {
  await delay();

  const stmt = db.prepare("SELECT * FROM users WHERE name LIKE ?");
  return stmt.all(`%${name}%`);
}
