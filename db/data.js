import { Database } from "bun:sqlite";

async function getUsers() {
  return new Promise((resolve, reject) => {
    try {
      const users = db.query("SELECT * FROM users").all();
      resolve(users);
    } catch (err) {
      reject(err);
    }
  });
}
