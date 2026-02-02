const express = require("express");
const router = express.Router();
const db = require("../helpers/db");

router.post("/create", async (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Content cannot be empty!" });
  }

  try {
    const newPaste = await db.addPaste(content);
    res.json(newPaste);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const pastes = await db.getAllPastes();
    res.json(pastes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const paste = await db.getPasteById(id);

    if (!paste) return res.status(404).json({ error: "Paste not found" });

    res.json(paste);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
