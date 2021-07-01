const express = require("express");
const router = express.Router();
const subController = require("../controllers/subController");

router.route("/").post(subController.createSub).get(subController.getAllSubs);

module.exports = router;
