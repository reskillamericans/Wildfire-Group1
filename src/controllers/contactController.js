const Contact = require("../models/contact");
const express = require("express");
const contactMail = require("../middlewares/contactMail");
const router = express.Router();

const createContact = (req, res) => {
  Contact.create(
    {
      ...req.body,
    },
    (err, newContact) => {
      if (err) {
        return res.status(500).json({ message: err });
      } else {
        newContact.save((err, contact) => {
          if (err) {
            return res.status(500).json({ message: err });
          }
          contactMail.contactMail;
          return res.status(200).json({
            message: "Thank you, we will be in touch shortly",
            contact,
          });
        });
      }
    }
  );
};

router.post("/events", createContact);
