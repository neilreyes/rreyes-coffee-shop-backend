import React, { useEffect, useContext } from "react";
import { HeartIcon, BookmarkIcon, ShareIcon } from "@heroicons/react/outline";
import { PlaceContext } from "../context/placeContext";

const PlaceEntry = (props) => {
    const { _id } = props.match.params;
    const { place, get_single_place } = useContext(PlaceContext);

    useEffect(() => {
        get_single_place(_id);
    }, []);

    return (
        <div className='p-5 mx-auto lg:w-3/6'>
            <article className='rounded-md bg-white	p-5	shadow-sm'>
                {place !== null ? (
                    <>
                        <header className='flex items-center '>
                            <div className='flex items-center'>
                                <div className='w-14 h-14 rounded-full border-gray-300 bg-gray-300'></div>

                                <div className='px-4'>
                                    <h3 className='text-2xl font-bold'>
                                        {place.business_name}
                                    </h3>
                                    <span className='text-sm text-gray-500'>
                                        by {place.contact_person.name}
                                    </span>
                                </div>
                            </div>

                            <div className='justify-self-end'>
                                <button className='p-2 rounded-full text-gray-400 hover:text-red-400 hover:bg-gray-100'>
                                    <HeartIcon className='w-6 h-6 ' />
                                </button>
                                <button className='p-2 rounded-full text-gray-400 hover:text-purple-400 hover:bg-gray-100'>
                                    <BookmarkIcon className='w-6 h-6' />
                                </button>
                                <button className='p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100'>
                                    <ShareIcon className='w-6 h-6 ' />
                                </button>
                            </div>
                        </header>

                        <div className='border-t border-gray-200 py-3 mt-5 text-gray-700 text-md'>
                            Badge goes here: <br />
                            is_speciality_coffee
                            <br />
                            is_roaster
                            <br />
                            is_chb_member
                            <br />
                            is_operational
                        </div>

                        <div className='border-t border-gray-200 py-3 text-gray-700 text-md'>
                            {place.description}
                        </div>

                        <div className='border-t border-gray-200 py-3 text-gray-700 text-md'>
                            Address: {place.business_address}
                        </div>
                        <div className='border-t border-gray-200 py-3 text-gray-700 text-md'>
                            Contact Number: {place.contact_number}
                        </div>
                        <div className='border-t border-gray-200 py-3 text-gray-700 text-md'>
                            Email address: {place.business_email_address}
                        </div>
                    </>
                ) : (
                    "Loading..."
                )}
            </article>
        </div>
    );
};

export default PlaceEntry;
