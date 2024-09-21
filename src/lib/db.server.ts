import { Database } from "bun:sqlite";

export const db = new Database("db.sqlite");

export const initDb = () => {
  const createUserTable = db.query(`CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT
  )`);

  createUserTable.run();

  const createCardTable = db.query(`CREATE TABLE IF NOT EXISTS cards (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    question TEXT,
    answer TEXT,
    wrongAnswers TEXT,
    userId TEXT
  )`);

  createCardTable.run();
};
