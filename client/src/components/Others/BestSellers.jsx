import React from "react";
import ProductCard2 from "../Cards/ProductCard2";
import ProductCard4 from "../Cards/ProductCard4";
const BestSellers = () => {
  return (
    <div>
      <div className="bg-[#F6F6F6] py-8 px-4 mx-8 rounded-[20px]">
        <div className="  flex  justify-between items-center ">
          <div></div>
          <h1 className="text-[30px] text-[#2C2C2C] text-center">
            Best Sellers
          </h1>
          <div className="w-[77px] h-[38px] font-Inter border flex justify-center items-center rounded-md mr-4">
            View all
          </div>
        </div>
        {/* <div className="flex flex-wrap justify-center"> */}
        <div className="flex  justify-center">
          <ProductCard2 star className="{w-[15%]" />
          <ProductCard2 star className="{w-[15%]" />
          <ProductCard2 star className="{w-[15%]" />
          <ProductCard2 star className="{w-[15%]" />
          <ProductCard2 star className="{w-[15%]" />
        
         
        </div>
      </div>
      {/* <div className="m-12 flex flex-wrap justify-center"> */}
      <div className="m-12 flex justify-center">

      <ProductCard4/>
      <ProductCard4/>

      <ProductCard4/>
      <ProductCard4/>

      </div>
    </div>
  );
};

export default BestSellers;