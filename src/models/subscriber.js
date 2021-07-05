const mongoose = require("mongoose");
const { schema } = mongoose;
const validator = require("validator");

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Subscriber must have an email!"],
      trim: true,
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Subscriber", subscriberSchema);
