require("dotenv").config();
const mongoose = require("mongoose");
const mongoUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.alxr2.mongodb.net/travellog?retryWrites=true&w=majority`;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
};

mongoose.connect(mongoUrl, options);

const db = mongoose.connection;

const connection = async () => {
    try {
        await db.once("open", () => {
            return console.log("Database connected");
        });
    } catch (error) {
        console.error(`Error: ${error.message}`.red.underline.bold);
        process.exit(1);
    }
};

module.exports = connection;
