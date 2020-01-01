import React from "react";
import { HeartIcon, BookmarkIcon, ShareIcon } from "@heroicons/react/outline";

const PlaceSummaryCard = ({ data }) => {
    const {
        _id,
        business_name,
        business_address,
        website,
        contact_number,
        business_email_address,
        operating_hours,
        is_speciality_coffee,
        is_roaster,
        description,
        addition_description,
        is_chb_member,
        is_operational,
        contact_person,
    } = data;

    const { name, email_address } = contact_person;

    return (
        <div
            key={_id}
            className='place-entry p-5 bg-white rounded-md shadow-sm my-5'>
            <header className='flex items-center '>
                <a
                    href={`/places/${_id}`}
                    className='inline-block w-auto h-full'>
                    <div className='w-14 h-14 rounded-full border-gray-300 bg-gray-300'></div>
                </a>
                <div className='px-4'>
                    <h3 className='text-lg font-bold'>
                        <a
                            href={`/places/${_id}`}
                            className='inline-block w-auto h-full'>
                            {business_name}
                        </a>
                    </h3>
                    <span className='text-sm text-gray-500'>
                        by {contact_person.name}
                    </span>
                </div>
            </header>
            {description && (
                <div className='mt-3 text-md text-gray-800 pt-3'>
                    {description}
                </div>
            )}
            <footer className='mt-3 border-t border-gray-200 pt-3'>
                <button className='p-2 rounded-full text-gray-400 hover:text-red-400 hover:bg-gray-100'>
                    <HeartIcon className='w-6 h-6 ' />
                </button>
                <button className='p-2 rounded-full text-gray-400 hover:text-purple-400 hover:bg-gray-100'>
                    <BookmarkIcon className='w-6 h-6' />
                </button>
                <button className='p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100'>
                    <ShareIcon className='w-6 h-6 ' />
                </button>
            </footer>
        </div>
    );
};

export default PlaceSummaryCard;
