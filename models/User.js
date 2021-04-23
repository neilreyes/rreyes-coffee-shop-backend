const mongoose = require("mongoose");
const crypto = require("crypto");

const schema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatar: { type: String },
    salt: String,
    hash: String,
    access_level: { type: Number, min: 1, max: 10, default: 10 },
    admin: { type: Boolean, default: false },
    rawPassword: String,
});

schema.methods.verifyPassword = (password, hash, salt) => {
    const hashVerify = crypto
        .pbkdf2Sync(password, salt, 10000, 64, "sha512")
        .toString("hex");
    return hash === hashVerify;
};

module.exports = UserModel = mongoose.model("user", schema);
