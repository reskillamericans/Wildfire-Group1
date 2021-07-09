const Contact = require("../models/contactUs");
const sendEmail = require("../services/sendEmail");
// const AppError = require("../utils/appError");

exports.getContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({});

    res.status(200).json({
      status: "success",
      data: {
        contacts,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.createContact = async (req, res, next) => {
  try {
    //Create new contact us message
    const newContact = await Contact.create({
      fullName: req.body.fullName,
      email: req.body.email,
      subject: req.body.subject,
      phoneNumber: req.body.phoneNumber,
      message: req.body.message,
    });

    //Send admin email
    await sendEmail({
      email: process.env.EMAIL_ADMIN,
      subject: `New contact us message. Subject: ${req.body.subject}`,
      message: `New message from the contact us form: \n ${req.body.message}`,
    });

    //Send Flash message
    req.flash(
      "contact",
      "Thank you for submitting your message. We will be in touch shortly."
    );

    //200 Response and redirect to index page
    res.status(200).redirect("/");
  } catch (err) {
    next(err);
  }
};
