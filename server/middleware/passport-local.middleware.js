const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const {
    login,
    serialize,
    deserialized,
} = require("../controllers/users.controller");

const strategy = new LocalStrategy(login);

passport.use(strategy);
passport.serializeUser(serialize);
passport.deserializeUser(deserialized);

module.exports = passport;
