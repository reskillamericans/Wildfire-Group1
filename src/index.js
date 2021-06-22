require("dotenv").config();
const express = require("express");
const app = express();
const faqRouter = require("./routes/faqRoutes");
const subRouter = require("./routes/subscriberRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const port = process.env.PORT || 3000;

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

//==================================================
// Routes
//==================================================

//FAQ Routes
app.use("/faqs", faqRouter);

//Subscriber routes!
app.use("/subscribers", subRouter);

//Placeholder routes for webpages
app.get("/", (req, res) => {
  res.send("Wildfire Group-1 Landing page");
});

app.get("/contact-us", (req, res) => {
  res.send("Contact Page!");
});

app.get("/faq", (req, res) => {
  res.send("FAQ");
});

app.get("/about-us", (req, res) => {
  res.send("About Us");
});

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
