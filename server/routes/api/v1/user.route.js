const router = require("express").Router();

const {
    isAdmin,
    isAuth,
} = require("../../../middleware/authentication.middleware");

const {
    register,
    logout,
    resetPassword,
    getUserById,
    getAllUsers,
    deleteUser,
    updateUser,
} = require("../../../controllers/users.controller");

/*
	@method GET
	@desc Logout user
	@route /api/v1/user/logout
	@access Public
*/
router.get("/logout", logout);

/*
	@method GET
	@desc Get all users
	@route /api/v1/user/
	@access Private: Admin access level (1) is required 
*/
router.get("/", isAdmin, getAllUsers);

/*
	@method POST 
	@desc Register User
	@route /api/v1/user/
	@access Public
*/
router.post("/", register);

/*
	@method POST
	@desc Reset password route is only accessible by admin and account owner 
	@route /api/v1/user/reset
	@access Private
*/
router.post("/reset", resetPassword);

/*
	@method GET
	@desc Get user by id
	@route /api/v1/user/:_id
	@access Private: Admin access level (1) is required OR Account owner is allowed
*/
router.get("/:_id", isAuth, getUserById);

/*
	@method DELETE
	@desc Remove user
	@route /api/v1/user/:_id
	@access Private: Only the account owner can delete his/her account
*/
router.delete("/:_id", isAuth, deleteUser);

/*
	@method PUT
	@desc Update user
	@route /api/v1/user/:_id
	@access Private: Only the account owner can delete his/her account
*/
router.put("/:_id", isAuth, updateUser);

module.exports = router;
