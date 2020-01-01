const Place = require("../models/Place");
const convert = require("convert-excel-to-json");

module.exports.get_places = async (req, res) => {
    try {
        let aggregate_options = [];
        let pagination_options = {
            page: req.query.page || 1,
            limit: req.query.limit || 10,
        };
        const places_aggregate = Place.aggregate(aggregate_options);

        const places = await Place.aggregatePaginate(
            places_aggregate,
            pagination_options
        );

        if (places.docs.length === 0) {
            return res.status(404).json({ message: "No places found" });
        }

        return res.status(200).json({ payload: places });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

module.exports.get_place = async (req, res) => {
    try {
        const place = await Place.find({ _id: req.params._id });

        if (!place || place.length === 0) {
            return res.status(404).json({ message: "Place not found" });
        }

        return res.status(200).json({ payload: place });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

module.exports.create_place = async (req, res) => {
    try {
        const {
            business_name,
            business_address,
            business_email_address,
            business_contact_number,
            description,
            additional_description,
            website,
            type_of_service,
            operating_hours,
            is_operational,
            is_roaster,
            is_speciality_coffee,
            is_chb_member,
            contact_person,
        } = req.body;

        const { name, email_address, contact_number } = contact_person;

        let new_type_of_service = [];

        // Check if type_of_service has values
        if (type_of_service.length !== 0) {
            type_of_service.map((entry) => new_type_of_service.push(entry));
        }

        let new_place_object = {
            business_name,
            business_address,
            business_email_address,
            business_contact_number,
            description,
            additional_description,
            website,
            type_of_service: new_type_of_service,
            operating_hours,
            is_operational,
            is_roaster,
            is_speciality_coffee,
            is_chb_member,
            contact_person: {
                name,
                email_address,
                contact_number,
            },
            user: req.user._id,
        };

        const place = new Place(new_place_object);

        await place.save();

        return res.status(200).json({ payload: place });
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports.update_place = async (req, res) => {
    try {
        const {
            business_name,
            bussiness_address,
            business_email_address,
            business_contact_number,
            description,
            additional_description,
            website,
            type_of_service,
            operating_hours,
            is_operational,
            is_roaster,
            is_speciality_coffee,
            is_chb_member,
            contact_person,
            user,
        } = req.body;

        const { name, email_address, contact_number } = contact_person;

        let new_type_of_service = [];

        // Check if type_of_service has values
        if (type_of_service.length !== 0) {
            type_of_service.map((entry) => new_type_of_service.push(entry));
        }

        let new_place_object = {
            business_name,
            bussiness_address,
            business_email_address,
            business_contact_number,
            description,
            additional_description,
            website,
            type_of_service: new_type_of_service,
            operating_hours,
            is_operational,
            is_roaster,
            is_speciality_coffee,
            is_chb_member,
            contact_person: {
                name,
                email_address,
                contact_number,
            },
            user,
        };

        const place = await Place.findById({ _id: req.params._id });

        if (!place) {
            return res.status(404).json({ message: "Place not found" });
        }

        await place.updateOne(new_place_object);

        return res
            .status(200)
            .json({ message: "Entry has been updated", payload: place });
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports.delete_place = async (req, res) => {
    try {
        const place = await Place.findById({ _id: req.params._id });

        if (!place) {
            return res.status(404).json({ message: "Place not found" });
        }

        await place.remove();
        return res.status(200).json({ message: "Place has been removed" });
    } catch (error) {
        return res.status(500).json(error);
    }
};

module.exports.upload_places = async (req, res) => {
    try {
        const rawData = convert({
            sourceFile: req.file.path,
            header: {
                rows: 1,
            },
            columnToKey: {
                "*": "{{columnHeader}}",
            },
        });

        // Manually enter admin user _id
        // TODO : make it dynamic, currently Form Respons 1 is hard coded
        const data = rawData["Form Responses 1"].map((entry) => {
            if (entry.is_operational === "Yes") {
                entry.is_operational = true;
            } else {
                entry.is_operational = false;
            }

            if (entry.is_roaster === "Yes") {
                entry.is_roaster = true;
            } else {
                entry.is_roaster = false;
            }

            if (entry.is_specialty_coffee === "Yes") {
                entry.is_specialty_coffee = true;
            } else {
                entry.is_specialty_coffee = false;
            }

            if (entry.is_chb_member === "Yes") {
                entry.is_chb_member = true;
            } else {
                entry.is_chb_member = false;
            }

            const contact_person = {
                name: entry.contact_person_name,
                email_address: entry.contact_person_email_address,
                contact_number: entry.contact_person_contact_number,
            };

            // TODO : make it dynamic, currently user id is hard coded
            const user = "607c124153f941131eb4d229";

            return {
                ...entry,
                user,
                contact_person,
            };
        });

        // TODO: make handle duplicate
        const newPlaces = await Place.insertMany(data, { ordered: false });

        res.status(200).json({ payload: newPlaces });
    } catch (error) {
        res.status(500).json(error);
    }
};
