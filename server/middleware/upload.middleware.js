const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "uploads/");
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    },
});
const upload = multer({ dest: "uploads/", storage });

module.exports = upload;
