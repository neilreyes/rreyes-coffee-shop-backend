const mongoose = require("mongoose");
const MongoStore = require("connect-mongo");

const mongoUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.alxr2.mongodb.net/travellog?retryWrites=true&w=majority`;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const sessionStore = MongoStore.create({
    mongoUrl: mongoUrl,
    collectionName: "sessions",
    options,
});

const sessionOptions = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 25, // Equals 1 day
    },
};

module.exports = sessionOptions;
