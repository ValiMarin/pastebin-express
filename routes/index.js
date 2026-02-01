var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  res.send("Pastebin API running!");
});

module.exports = router;
