const mongoose = require('mongoose');
const { schema } = mongoose;

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, 'An FAQ must have a question'],
      trim: true,
    },
    answer: {
      type: String,
      required: [true, 'An FAQ must have an answer'],
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Faq', faqSchema);
