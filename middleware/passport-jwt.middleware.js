const passport = require("passport");
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const UserModel = require("../models/User.js");

const options = {
    secretOrKey: "my secret",
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

const verify = (payload, done) => {
    try {
        const user = UserModel.findById({ _id: payload.sub });
        if (!user) {
            done(null, false);
        }
        return done(null, user);
    } catch (error) {
        return done(error, false);
    }
};

const strategy = new JWTStrategy(options, verify);

passport.use(strategy);

module.exports = passport;
