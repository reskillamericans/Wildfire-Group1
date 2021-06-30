const Faq = require("../models/faq");
const AppError = require("../utils/appError");

//Get all FAQs
exports.getAllFaqs = async (req, res, next) => {
  try {
    //req expression from form
    const faqs = await Faq.find({});
    res.status(200).render("faq", { faqs });
  } catch (err) {
    next(err);
  }
};

//Get single FAQ
exports.getFaq = async (req, res, next) => {
  try {
    const faq = await Faq.findById(req.params.id);

    if (!faq) {
      return next(new AppError(404, "FAQ not found!"));
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
