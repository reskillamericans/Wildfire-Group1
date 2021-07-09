const mongoose = require("mongoose");
const { schema } = mongoose;
const validator = require("validator");
const AppError = require("../utils/appError");

const contactSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "You must provide your full name."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "You must provide an email."],
      trim: true,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email."],
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    subject: {
      type: String,
      required: [true, "Please provide a subject"],
      trim: true,
      enum: [
        "customer service",
        "technical support",
        "complaints/concerns",
        "Other",
      ],
    },
    message: {
      type: String,
      required: [true, "Please provide a message."],
      trim: true,
    },
  },
  { timestamps: true }
);

//Validate phoneNumber only if phoneNumber exists
contactSchema.pre("save", function (next) {
  if (this.phoneNumber && !validator.isMobilePhone(this.phoneNumber)) {
    return next(new AppError(404, "Please provide a valid phone number"));
  }

  next();
});

module.exports = mongoose.model("Contact", contactSchema);
