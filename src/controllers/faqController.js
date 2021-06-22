const Faq = require("../models/faq");
const AppError = require("../utils/appError");

//Get all FAQs
exports.getAllFaqs = async (req, res, next) => {
  try {
    const faqs = await Faq.find({});

    if (faqs.length === 0) {
      return next(new AppError(404, "FAQs Cannot be found..."));
    }

    res.status(200).json({
      status: "success",
      results: faqs.length,
      data: {
        faqs,
      },
    });
  } catch (err) {
    next(err);
  }
};

//Get single FAQ
exports.getFaq = async (req, res, next) => {
  try {
    const faq = await Faq.findById(req.params.id);

    if (!faq) {
      return next(new AppError(404, "FAQ Cannot be found..."));
    }

    res.status(200).json({
      status: "success",
      data: {
        faq,
      },
    });
  } catch (err) {
    next(err);
  }
};
