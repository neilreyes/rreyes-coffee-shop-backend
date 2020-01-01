const router = require("express").Router();
const passport = require("passport");

/*
	@method POST
	@desc Login User
	@route /api/v1/auth/
	@access Public
*/
router.post("/", passport.authenticate("local"), (req, res) => {
    try {
        return res.status(200).json({ payload: req.user });
    } catch (error) {
        return res.status(500).json(error);
    }
});

module.exports = router;
