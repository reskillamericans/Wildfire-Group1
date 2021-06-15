require('dotenv').config();
const mongoose = require('mongoose');
const Faq = require('../models/faq');
const faqData = require('../data/faqData.json');

const dbSetup = require('../database/setup');

dbSetup();

const importData = async () => {
  try {
    await Faq.create(faqData);
    console.log('Data Successfully loaded...');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Faq.deleteMany();
    console.log('Data Successfully deleted...');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

//Importing Data
// node src/seeds/faqSeeds --import

//Deleteing
// node src/seeds/faqSeeds --delete
