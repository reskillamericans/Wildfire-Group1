const mongoose = require("mongoose");
const { schema } = mongoose;
const validator = require("validator");

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
      validate: [
        validator.isMobilePhone,
        "Please provide a valide phone number",
      ],
    },
    subject: {
        type: String,
        required: [true, 'Please provide a subject'],
        trim: true,
        enum: ['customer service', 'technical support', 'complaints/concerns', 'Other']
    },
    message: {
      type: String,
      required: [true, "Please provide a message."],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);
