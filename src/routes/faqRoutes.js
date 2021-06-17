const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');

router.route('/').get(faqController.getAllFaqs);

router.route('/:id').get(faqController.getFaq);

module.exports = router;
