const express = require("express");
const router = express.Router();
const db = require("../helpers/db");

router.post("/create", async (req, res) => {
  const { content } = req.body;

  if (!content)
    return res.render("index", {
      pastes: await db.getAllPastes(),
      error: "Content cannot be empty!",
    });

  try {
    await db.addPaste(content);
    res.redirect("/paste");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const pastes = await db.getAllPastes();
    res.render("index", { pastes });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const paste = await db.getPasteById(id);
    if (!paste) return res.status(404).send("Paste not found");

    res.render("fullText", { paste });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/edit/:id", async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;

  if (!content) return res.status(400).send("Content cannot be empty!");

  try {
    const updatedPaste = await db.updatePaste(id, content);
    if (!updatedPaste) return res.status(404).send("Paste not found");

    res.redirect("/paste");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
