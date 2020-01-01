import { SearchIcon } from "@heroicons/react/outline";
import React from "react";

const Header = () => {
    return (
        <div className='sticky top-0 z-40 lg:z-50 w-full max-w-8xl mx-auto bg-white flex-none flex py-3 border-gray-100 border-b'>
            <div className='flex-none pl-4 sm:pl-6 xl:pl-8 flex items-center lg:border-b-0 lg:w-60 xl:w-72'>
                <a href='/' className='overflow-hidden w-10 md:w-auto'>
                    <span className='sr-only'>The Coffee Db</span>
                    <span className='block text-2xl text-gray-800'>
                        The Coffee Db PH
                    </span>
                </a>
            </div>
            <div className='flex-auto h-18 flex items-center justify-between px-4 sm:px-6 lg:mx-6 lg:px-0 xl:mx-8'>
                <button
                    type='button'
                    className='group leading-6 font-medium flex items-center space-x-3 sm:space-x-4 hover:text-gray-600 transition-colors duration-200 w-full py-2'>
                    <SearchIcon className='w-8 h-8 text-gray-500' />
                    <span className='text-gray-500'>
                        Quick search
                        <span className='hidden sm:inline'> for anything</span>
                    </span>
                </button>
                <div className='lg:w-64 pl-8 flex-shrink-0 flex items-center justify-end space-x-6'>
                    Contact
                </div>
            </div>
        </div>
    );
};

export default Header;
