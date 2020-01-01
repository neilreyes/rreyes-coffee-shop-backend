const route = require("express").Router();

// route.use('/travel-log')
route.use("/auth", require("./auth.route.js"));
route.use("/log", require("./log.route.js"));
route.use("/user", require("./user.route.js"));
route.use("/place", require("./place.route.js"));

module.exports = route;
