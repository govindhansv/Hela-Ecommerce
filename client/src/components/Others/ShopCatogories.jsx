import React from "react";
import ProductCard3 from "../Cards/ProductCard3";

const ShopCatogories = () => {
  return (
    <div className="mx-8 my-4 flex flex-col items-center w-full bg-[#CC4254] py-5 pb-12 rounded-[20px]">
      <h1 className="text-white text-[30px] my-6 ">Shop by Categories</h1>
      <div className="flex ">
        <ProductCard3 />
        <ProductCard3 />

        <ProductCard3 />
        <ProductCard3 />
      </div>
    </div>
  );
};

export default ShopCatogories;