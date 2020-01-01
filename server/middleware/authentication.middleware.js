module.exports = {
    isAuth: (req, res, next) => {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.status(401).json({
                message: "Unauthorized: Authentication is required",
            });
        }
    },
    isAdmin: (req, res, next) => {
        if (req.isAuthenticated() && req.user.admin) {
            next();
        } else {
            res.status(401).json({
                message: "Unauthorized: Access level denied",
            });
        }
    },
};
