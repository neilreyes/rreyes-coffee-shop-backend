// Import dependencies
const express = require("express");
const color = require("color");
const helmet = require("helmet");
const morgan = require("morgan");
const passport = require("./middleware/passport-local.middleware");
const notFound = require("./middleware/not-found.middleware");
const flash = require("connect-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 5000;
require("./database")();

// Include middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet()); // security checks
app.use(morgan("combined")); // http logger
app.use(
    session({
        secret: process.env.SECRET,
        resave: true,
        saveUninitialized: true,
    })
);

// Passportjs middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash middleware
app.use(flash());

// Routes
app.use("/api/v1", require("./routes/api/v1"));
app.use(notFound);
app.use(require("errorhandler"));

// Initialize server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
