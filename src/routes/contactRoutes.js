const express = require("express");
const router = express.Router();
const contatController = require("../controllers/contatController");

router.post("/contact", contatController.createContact);

module.exports = router;
