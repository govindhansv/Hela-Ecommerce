import React from "react";
import { BiSearch } from "react-icons/bi";
import { GrClose } from "react-icons/gr";

const SearchBar = ({ handleClick, search, setSearch, placeholder }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `${
      import.meta.env.VITE_FRONTEND_URL
    }/collections?search=${encodeURIComponent(search)}`;
  };

  return (
    <div className="w-full">
      <form
        className="flex items-center bg-[#CC4254] py-2 px-4 rounded-lg border border-red-100"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="text"
          className="outline-none w-full bg-[#CC4254] rounded px-2 py-1 placeholder-white text-white"
          placeholder={placeholder || "Search..."}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            handleClick("search", e.target.value);
          }}
        />
        {search ? (
          <button
            type="button"
            className="ml-2"
            onClick={() => {
              handleClick("search", "");
              setSearch("");
            }}
          >
            <GrClose className="text-xl text-white hover:text-gray-200" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              handleClick("search", search);
            }}
          >
            <BiSearch className="text-xl text-white hover:text-gray-200" />
          </button>
        )}
        <button
          type="submit"
          className="ml-2 bg-white text-red-500 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
