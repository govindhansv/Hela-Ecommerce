import React from "react";
import { BiSearch } from "react-icons/bi";
import { GrClose } from "react-icons/gr";

const SearchBar = ({ handleClick, search, setSearch, placeholder }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to the desired URL with the search value
    window.location.href = `${
      import.meta.env.VITE_FRONTEND_URL
    }/collections?search=${encodeURIComponent(search)}`;
  };

  return (
    <div className="w-full">
      <form
        className="flex items-center bg-white py-2 px-4 rounded-lg border"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="text"
          className="outline-none w-full"
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
            onClick={() => {
              handleClick("search", "");
              setSearch("");
            }}
          >
            <GrClose className="text-xl text-gray-400 hover:text-gray-800" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              handleClick("search", search);
            }}
          >
            {/* <BiSearch className="text-xl text-gray-400 hover:text-gray-800" /> */}
          </button>
        )}
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
