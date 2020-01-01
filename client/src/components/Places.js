import React, { useContext } from "react";
import PlaceSummaryCard from "./PlaceSummaryCard";
import { PlaceContext } from "../context/placeContext";

const Places = ({ data }) => {
    const { load_more_places } = useContext(PlaceContext);

    return (
        <div id='places' className='p-5 mx-auto lg:w-3/6'>
            {data.docs.map((place) => (
                <PlaceSummaryCard key={place._id} data={place} />
            ))}

            {data.hasNextPage && (
                <button
                    onClick={load_more_places}
                    className='py-3 px-5 rounded-md bg-purple-500 hover:bg-purple-600 transition ease-in-out duration-300 text-white'>
                    See more
                </button>
            )}
        </div>
    );
};

export default Places;
