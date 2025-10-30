import { URL } from "@/Common/api";
import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const ProductCard3 = ({ item }) => {
  return (
    <div className="relative w-full">
      <div className="pt-[100%]"></div>
      <div
        className="absolute inset-0 bg-cover bg-center flex flex-col justify-between p-4"
        style={{ backgroundImage: `url('${URL}/img/${item.imgURL}')` }}
      >
        <div className="text-[20px] sm:text-[24px] md:text-[26px] text-white text-left">
          {item.name}
        </div>
        <div>
          <Link to={`/collections?category=${item._id}`}>
            <Button className="bg-transparent border-[1px] mt-3 sm:w-[176px] sm:h-[50px] rounded-[5px] font-Inter text-[16px] sm:text-[18px] hover:opacity-100 hover:bg-white hover:text-[#2C2C2C] text-white">
              View
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard3;
