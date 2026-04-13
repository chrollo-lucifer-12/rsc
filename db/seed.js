import { Database } from "bun:sqlite";

const db = new Database("app.db");

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT
  )
`);

db.run(`DELETE FROM users`);

const insert = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)");

const users = [
  ["Sahil", "sahil@example.com"],
  ["John", "john@example.com"],
  ["Alice", "alice@example.com"],
];

for (const user of users) {
  insert.run(...user);
}

console.log("✅ Database seeded!");
