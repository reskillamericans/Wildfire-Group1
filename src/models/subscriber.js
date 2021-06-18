const mongoose = require('mongoose');
const { schema } = mongoose;

const subscriberSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Subscriber must have an email!'],
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Subscriber', subscriberSchema);
