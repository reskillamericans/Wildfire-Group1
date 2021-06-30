require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const viewRouter = require("./routes/viewRoutes");
const faqRouter = require("./routes/faqRoutes");
const subRouter = require("./routes/subscriberRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const port = process.env.PORT || 3000;
const { seedMember } = require("./seeders/members");

//Uncaught Exception Errors
process.on("uncaughtException", (err) => {
  console.log(
    "There was an uncaught exception error. Server shutting down...",
    err
  );
  process.exit(1);
});

//Engines
app.engine("ejs", ejsMate);

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.set("partials", path.join(__dirname, "partials"));
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

// View Routes
app.use("/", viewRouter);

//FAQ Routes
app.use("/faq", faqRouter);

//Subscriber routes!
app.use("/subscribers", subRouter);

//Unhandled Routes
app.all("*", (req, res, next) => {
  next(new AppError(404, `Can't find ${req.originalUrl} on this server!`));
});

//Global Error Handler
app.use(globalErrorHandler);

//Server
const server = app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`);
});

//Unhandled Rejection Errors
process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection Error!", err);
});
