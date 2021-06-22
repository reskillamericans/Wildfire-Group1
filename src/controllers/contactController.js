const Contact = require("../models/contact");

exports.createContact = async (req, res) => {
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
          const message =
            "Thank you for joining us! We promise to only send emails that are important to you regarding any new updates or features added to the application!";

          //Send email to newly created subscriber
          await sendEmail({
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_ADMIN,
            subject: "Wilfire Contact",

            html: `${req.body.name} contacted you. <br/> ${req.body}`,
          });
          return res.status(200).json({
            message: "Thank you, we will be in touch shortly",
            contact,
          });
        });
      }
    }
  );
};
