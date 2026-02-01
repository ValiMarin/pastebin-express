const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "pastebin",
  password: "Pastebin",
  port: 5432,
});

client.connect();

async function getAllPastes() {
  const result = await client.query("SELECT content FROM texts");
  return result.rows;
}

async function addPaste(content) {
  const result = await client.query(
    "INSERT INTO texts (content) VALUES ($1) RETURNING *",
    [content],
  );
  return result.rows[0];
}

module.exports = {
  client,
  getAllPastes,
  addPaste,
};
