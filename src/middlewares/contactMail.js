const nodemailer = require("nodemailer");
exports.contactMail = (req, res) => {
  const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: { user: "64e36d942e6147", pass: "eec9d24f8ed100" },
  });

  const mailOptions = {
    from: "reskillnodejs@gmail.com",
    to: "admin@reskill.com",
    subject: "Wilfire Contact",

    html: `${req.body.name} contacted you. <br/> ${req.body}`,
  };

  transport.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).json({ message: err });
    }
  });
};
