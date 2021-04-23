const crypto = require("crypto");

const validatePassword = async (password, hash, salt) => {
    var hashVerify = crypto
        .pbkdf2Sync(password, salt, 10000, 64, "sha512")
        .toString("hex");
    return hash === hashVerify;

    console.log(hashVerify === hash);

    return true;
};

const generatePassword = (password) => {
    const salt = crypto.randomBytes(32).toString("hex");
    const genHash = crypto
        .pbkdf2Sync(password, salt, 10000, 64, "sha512")
        .toString("hex");

    return {
        salt: salt,
        hash: genHash,
    };
};

module.exports = {
    validatePassword,
    generatePassword,
};
