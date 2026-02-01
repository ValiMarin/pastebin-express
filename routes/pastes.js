const express = require("express");
const router = express.Router();
const client = require("../db");

router.get("/", async (req, res) => {
  try {
    const result = await client.query("SELECT content FROM texts");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/", async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Content cannot be empty!" });
  }

  try {
    const result = await client.query(
      "INSERT INTO texts (content) VALUES ($1) RETURNING *",
      [content],
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
