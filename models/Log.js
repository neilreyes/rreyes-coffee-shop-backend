const mongoose = require("mongoose");
const { Schema } = mongoose;
const TravelLogSchema = mongoose.Schema(
    {
        title: String,
        user: { type: Schema.Types.ObjectId, ref: "user" },
        place: {
            name: String,
            address: String,
            latitude: {
                type: Number,
                required: true,
                min: -90,
                max: 90,
            },
            longtitude: {
                type: Number,
                required: true,
                min: -180,
                max: 180,
            },
        },
        rating: {
            type: Number,
            min: 0,
            max: 10,
            default: 0,
        },
        image: String,
        comment: String,
        visitDate: {
            required: true,
            type: Date,
        },
    },
    { timestamps: true }
);

module.exports = TravelLog = mongoose.model("travellog", TravelLogSchema);
