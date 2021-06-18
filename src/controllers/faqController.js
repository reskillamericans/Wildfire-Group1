const Faq = require('../models/faq');

//Get all FAQs
exports.getAllFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find({});

    res.status(200).json({
      status: 'success',
      results: faqs.length,
      data: {
        faqs,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'fail',
      message: err,
    });
  }
};

//Get single FAQ
exports.getFaq = async (req, res) => {
  try {
    const faq = await Faq.findById(req.params.id);

    if (!faq) {
      return res.status(404).json({
        status: 'fail',
        message: 'FAQ cannot be found...',
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        faq,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'fail',
      message: err,
    });
  }
};
