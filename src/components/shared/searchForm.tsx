import Link from "next/link";
import { SetStateAction, useState } from "react";

const SearchForm = () => {

    const [searchValue, setSearchValue] = useState('');
    const handleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
        setSearchValue(e.target.value);
    };

  return (
    <div className="relative w-full">
        <input onChange={handleChange} id="search-dropdown" className="block p-2 w-full z-20 text-sm text-[#1b1b1b] placeholder:text-[#1b1b1b] bg-gray-100 rounded-e-xl rounded-s-xl border-s-2 border border-gray-200" placeholder="Apa yang Anda cari?" required />
        {searchValue ? (
        <Link href={`/search/${searchValue}`}> 
            <span className="absolute top-0 end-0 py-3 px-5 sm:ms-4 text-sm font-medium h-full text-[#1b1b1b] cursor-pointer rounded-e-xl border border-s-0 border-gray-300 hover:text-gray-500 ">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </span>
        </Link>
        ) : (
            <span className="absolute top-0 end-0 py-3 px-5 sm:ms-4 text-sm font-medium h-full text-[#1b1b1b] cursor-pointer rounded-e-xl border border-s-0 border-gray-300 hover:text-gray-500 focus:ring-4 ">
                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
            </span>
        )}
    </div>
  );
};


export default SearchForm;