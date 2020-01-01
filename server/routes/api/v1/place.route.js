const router = require("express").Router();
const upload = require("../../../middleware/upload.middleware");

const {
    isAdmin,
    isAuth,
} = require("../../../middleware/authentication.middleware");

const {
    get_places,
    get_place,
    create_place,
    delete_place,
    update_place,
    upload_places,
} = require("../../../controllers/place.controller");

/*
	@method GET
	@desc Fetch all places
	@access Public
*/
router.get("/", get_places);

/*
	@method GET
	@desc Feth one place
	@access Public
*/
router.get("/:_id", get_place);

/*
	@method POST
	@desc Create a place
	@access Private (Admin level access)
*/
router.post("/", isAdmin, create_place);

/*
	@method POST
	@desc Upload multiple entries
	@access Private (Admin level access)
*/
router.post("/upload", isAdmin, upload.single("file"), upload_places);

/*
	@method PUT
	@desc Update a place
	@access Private (Admin level access)
*/
router.put("/:_id", isAdmin, update_place);

/*
	@method DELETE
	@desc Delete a place
	@access Private (Admin level access)
*/
router.delete("/:_id", isAdmin, delete_place);

module.exports = router;
