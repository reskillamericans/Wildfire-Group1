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
      'You have successfully subscribed to our newsletter';

    //Send email to newly created subscriber
    await sendEmail({
      email: req.body.email,
      subject: 'Welcome to the Wildfire Subscription!',
      message,
    });

    //Notify admin of new subscriber
    await sendEmail({
      email: process.env.EMAIL_ADMIN,
      subject: 'A new subscriber has joined!',
      message: `${req.body.email} has joined as a new subscriber!`
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
