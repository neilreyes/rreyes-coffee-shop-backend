const mongoose = require("mongoose");
const paginate = require("mongoose-aggregate-paginate-v2");
const schema = new mongoose.Schema(
    {
        business_name: { required: true, type: String, unique: true },
        business_address: { required: true, type: String },
        business_email_address: String,
        contact_number: String,
        description: String,
        additional_description: String,
        website: String,
        type_of_service: [String],
        operating_hours: String,
        is_operational: Boolean,
        is_roaster: Boolean,
        is_specialty_coffee: Boolean,
        is_chb_member: Boolean,
        contact_person: {
            name: String,
            email_address: String,
            contact_number: String,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

schema.plugin(paginate);

module.exports = PlaceModel = mongoose.model("place", schema);
