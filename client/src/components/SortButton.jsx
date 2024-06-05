import React from "react";

const SortButton = ({ sort, handleClick }) => {
  const handleChange = (sort, value) => {
    handleClick(sort, value);
  };

  return (
    <div className="lg:w-[406px] w-[300px] h-[50px] lg:h-[74px] font-[300] border-[1px] flex items-center border-[#9F9F9F] rounded-[10px]">
      <div className="w-2/5 text-center text-[20px] font-Inter border-r-[1px] border-[#9F9F9F]">
        Sort by:
      </div>
      <div className="w-3/5 px-4">
        <select
          className="bg-white w-full font-Inter text-[20px] outline-none"
          value={sort}
          onChange={(e) => handleChange("sort", e.target.value)}
        >
          <option value="">Newest to Oldest</option>
          <option value="created-desc">Oldest to Newest</option>
          <option value="price-asc">Price Low to High</option>
          <option value="price-desc">Price High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default SortButton;
