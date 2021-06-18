const Subscriber = require('../models/subscriber');
const sendEmail = require('../services/sendEmail');

//Get all subscribers
exports.getAllSubs = async (req, res) => {
  try {
    const subs = await Subscriber.find({});

    res.status(200).json({
      status: 'success',
      results: subs.length,
      data: {
        subs,
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

//Create Subscriber
exports.createSub = async (req, res) => {
  try {
    //Save subscriber email to the database
    const subscriber = await Subscriber.create({
      email: req.body.email,
    });

    //Email message
    const message =
      'Thank you for joining us! We promise to only send emails that are important to you regarding any new updates or features added to the application!';

    //Send email to newly created subscriber
    await sendEmail({
      email: req.body.email,
      subject: 'Welcome to the Wildfire Subscription!',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Thank you for subscribing!',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: 'fail',
      message: err,
    });
  }
};
