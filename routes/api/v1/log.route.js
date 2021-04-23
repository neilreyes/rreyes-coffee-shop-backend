const { Router } = require("express");
const router = Router();
const TravelLog = require("../../../models/Log");

/*
	@method GET
	@desc Get all travel logs
	@access public
*/
router.get("/", async (req, res) => {
    try {
        const entries = await TravelLog.find();

        if (entries.length === 0) {
            return res.status(200).json({ message: "No entries available" });
        }

        return res.status(200).json({ payload: entries });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

/*
	@method GET
	@desc Get a travel log by id
	@access public
*/
router.get("/:_id", async (req, res) => {
    try {
        const entry = await TravelLog.findById({ _id: req.params._id });

        if (entry.length === 0) {
            return res.status(200).json({ message: "No entry available" });
        }

        return res.status(200).json({ payload: entry });
    } catch (error) {
        return res.status(500).json({ error });
    }
});

/*
	@method POST
	@desc Post a travel log
	@access private
*/
router.post("/", async (req, res) => {
    const { title, rating, image, comment } = req.body;

    try {
        const entry = new TravelLog({ title, rating, image, comment });

        await entry.save();
        return res.status(201).json({
            message: "Travel log entry has been added",
            payload: entry,
        });
    } catch (error) {
        return res.status(500).json(error);
    }
});

/*
	@method DELETE
	@desc Delete travel log
	@access private
*/
router.delete("/:_id", async (req, res) => {
    try {
        const entry = await TravelLog.findById({ _id: req.params._id });

        if (!entry) {
            return res.status(404).json({ message: "Entry not found" });
        }

        await entry.deleteOne();
        res.status(200).json({ message: "Entry has been deleted" });
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = router;
