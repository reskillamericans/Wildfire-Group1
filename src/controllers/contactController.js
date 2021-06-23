const Contact = require("../models/contact");

exports.createContact = (req, res) => {
  Contact.create(
    {
      ...req.body,
    },
    (err, newContact) => {
      if (err) {
        return res.status(500).json({ message: err });
      } else {
        if (err) {
          return res.status(500).json({ message: err });
        }
        const message = "Thank you, we will be in touch shortly!";

        //Send email to newly created subscriber
        sendEmail({
          from: process.env.EMAIL_FROM,
          to: process.env.EMAIL_ADMIN,
          subject: "Wilfire Contact",

          html: `${req.body.name} contacted you. <br/> ${req.body}`,
        });
        return res.status(200).json({
          message: "Thank you, we will be in touch shortly",
          contact,
        });
      }
    }
  );
};
