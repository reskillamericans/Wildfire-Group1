require("dotenv").config();
const express = require("express");
const app = express();
const faqRouter = require("./routes/faqRoutes");
const subRouter = require("./routes/subscriberRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const port = process.env.PORT || 3000;
const { seedMember } = require("./seeders/members");

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//See console.log of whether you are in production or development mode
console.log(process.env.NODE_ENV);

//==================================================
// DATABASE
//==================================================
const dbSetup = require("./database/setup");

dbSetup();

seedMember();
//==================================================
// Routes
//==================================================

//FAQ Routes
app.use("/faqs", faqRouter);

//Subscriber routes!
app.use("/subscribers", subRouter);

//Unhandled Routes
app.all("*", (req, res, next) => {
  next(new AppError(404, `Can't find ${req.originalUrl} on this server!`));
});

//Global Error Handler
app.use(globalErrorHandler);

//Server
app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});
