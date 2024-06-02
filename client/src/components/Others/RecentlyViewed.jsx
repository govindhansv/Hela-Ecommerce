import React from "react";
import ProductCard2 from "../Cards/ProductCard2";

const RecentlyViewed = () => {
  return (
    <div className="my-12 mx-4"> 
      <h1 className="text-[30px] text-[#2C2C2C] text-center">Recently Viewed</h1>
      <div className="flex flex-wrap justify-center">
        <ProductCard2 className="{w-[15%]" />
        <ProductCard2 className="{w-[15%]" />
        <ProductCard2 className="{w-[15%]" />
        <ProductCard2 className="{w-[15%]" />
        <ProductCard2 className="{w-[15%]" />
     
      
      </div>
    </div>
  );
};

export default RecentlyViewed;