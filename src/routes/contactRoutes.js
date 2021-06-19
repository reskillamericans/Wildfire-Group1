const express = require("express");
const router = express.Router();
const contatController = require("../controllers/contatController");

router.post("/events", contatController.createContact);

module.exports = router;
