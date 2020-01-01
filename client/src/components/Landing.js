import React, { useEffect, useState, useContext } from "react";
import Places from "./Places";
import { PlaceContext } from "../context/placeContext";

const Landing = () => {
    const { loading, places, get_places } = useContext(PlaceContext);

    useEffect(() => {
        get_places();
        console.log(places);
    }, []);

    return (
        <div id='landing'>
            {loading ? (
                "Loading..."
            ) : (
                <div>
                    {places ? <Places data={places} /> : "No places found"}
                </div>
            )}
        </div>
    );
};

export default Landing;
