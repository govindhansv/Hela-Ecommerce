import { URL } from "@/Common/api";
import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const ProductCard3 = ({ item }) => {
  return (
          <Link to={`/collections?category=${item._id}`}>

    <div className="w-full">
      {/* Image Container */}
      <div className="relative w-full">
        <div className="pt-[100%]"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${URL}/img/${item.imgURL}')` }}
        ></div>
      </div>

      {/* Content Below Image */}
      <div className="p-4">
        {/* <div className="text-[20px] font-bold sm:text-[24px] md:text-[26px] text-[#701627] text-center mb-3">
          {item.name}
        </div> */}
        <div className="flex justify-center">
            {/* <Button className="bg-[#701627] border-[1px] border-gray-800 sm:w-[176px] sm:h-[50px] rounded-[5px] font-Inter text-[16px] sm:text-[18px] hover:bg-transparent hover:text-gray-800 text-white transition-colors">
              View
            </Button> */}
            <div className="text-[20px] font-bold sm:text-[24px] md:text-[26px] text-[#701627] text-center mb-3">
              {item.name}
            </div>
        </div>
      </div>
    </div>
          </Link>
  );
};

export default ProductCard3;
