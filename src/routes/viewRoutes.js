const express = require("express");

const router = express.Router();

//Home Page
router.get("/index", (req, res) => {
  res.status(200).render("index");
});

//Contact Page
router.get("/contact", (req, res) => {
  res.render("contact");
});

//About Us Page
router.get("/about-us", (req, res) => {
  res.render("about-us");
});

module.exports = router;
