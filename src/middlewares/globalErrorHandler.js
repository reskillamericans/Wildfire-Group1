const AppError = require("../utils/appError");

//Production Error API ERRORS
// const sendProductionErr = (err, res) => {
//   if (err.operational) {
//     res.status(err.statusCode).json({
//       status: err.status,
//       message: err.message,
//     });
//   } else {
//     console.log("Error", err);

//     res.status(500).json({
//       status: "error",
//       message: "Something went wrong...",
//     });
//   }
// };

//Production Errors Render templates
const sendProductionErr = (err, res) => {
  if (err.operational) {
    res.status(err.statusCode).render('error',{
      statusCode: err.statusCode,
      status: err.status,
      message: err.message,
    });
  } else {
    console.log("Error", err);

    res.status(500).render('error',{
      status: "error",
      message: "Something went wrong...",
    });
  }
};

//Development Error API
// const sendDevelopmentErr = (err, res) => {
//   res.status(err.statusCode).json({
//     status: err.status,
//     error: err,
//     message: err.message,
//     stack: err.stack,
//   });
// };

//Development Errors Render Template
const sendDevelopmentErr = (err, res) => {
  res.status(err.statusCode).render('error',{
    statusCode: err.statusCode,
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

//Duplicate key error
const handleDuplicateFieldErr = (err) => {
  const value = Object.values(err.keyValue);
  return new AppError(400, `${value} is already a registered subscriber`);
};

// Cast Error
const handleCastErr = (err) => {
  return new AppError(400, `${err.value} is not a valid ID`);
};

//Validation Errors
const handleValidationErr = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  return new AppError(400, `${errors.join(" ")}`);
};

//Global Error Handler
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  //Send Development Error
  if (process.env.NODE_ENV === "development") {
    sendDevelopmentErr(err, res);

    //Send Production Error
  } else if (process.env.NODE_ENV === "production") {
    //Duplicate field error
    if (err.code === 11000) err = handleDuplicateFieldErr(err);
    //Cast Error
    if (err.name === "CastError") err = handleCastErr(err);
    //Validation Error
    if (err.name === "ValidationError") err = handleValidationErr(err);

    sendProductionErr(err, res);
  }
};
