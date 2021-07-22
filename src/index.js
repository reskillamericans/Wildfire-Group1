require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const ejsMate = require("ejs-mate");
const viewRouter = require("./routes/viewRoutes");
const faqRouter = require("./routes/faqRoutes");
const subRouter = require("./routes/subscriberRoutes");
const contactRouter = require("./routes/contactRoutes");
const memberRouter = require("./routes/memberRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./middlewares/globalErrorHandler");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
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
app.use(
  session({
    secret: "thisshouldbeabettersecret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 6000 },
  })
);
app.use(flash());

//Security Middlewares
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());

app.use((req, res, next) => {
  res.locals.subscribed = req.flash("subscribed");
  res.locals.contact = req.flash("contact");
  next();
});

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

//Contact Us Routes
app.use("/", contactRouter);

//Member routes
app.use("/", memberRouter);

//Unhandled Routes
app.all("*", (req, res, next) => {
  next(
    new AppError(404, `Sorry the page you are looking for cannot be found.`)
  );
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
