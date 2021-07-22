const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

// router.get("/contacts", contactController.getContacts);

router.post("/contact", contactController.createContact);

module.exports = router;
