import { URL } from "@/Common/api";
import React from "react";
import { IoMdStar } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const ProductCard2 = ({ star, className, product }) => {
  const navigate = useNavigate();

  return (
    <div
      className={`m-4 max-w-[264px] min-h-[403px] flex flex-col cursor-pointer ${className} `}
      onClick={() => {
        navigate(`/product/${product._id}`);
      }}
    >
      <div className="w-full ">
        {/* // src="https://images.unsplash.com/photo-1588909006332-2e30f95291bc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGlhbW9uZCUyMGNoYWlufGVufDB8fDB8fHww" */}

        <img
          className="h-[330px] w-full object-cover rounded-md"
          src={`${URL}/img/${product && product.imageURL}`}
          alt={product && product.name}
        />
      </div>
      <div className="font-Inter text-lg mt-2 text-[#2C2C2C] font-normal">
        {product && product.name}
      </div>
      {star && (
        <div className=" flex text-[#CC4254]  mt-2">
          <IoMdStar className="h-5 w-5" />
          <IoMdStar className="h-5 w-5" />
          <IoMdStar className="h-5 w-5" />
          <IoMdStar className="h-5 w-5" />
          <IoMdStar className="h-5 w-5" />
        </div>
      )}
      <div className="mt-2 flex items-center justify-between">
        <h1 className="font-Inter text-[22px] text-[#2C2C2C]">
          ₹ {product && product.price}
        </h1>
        {/* <h1 className="font-Inter text-[14px] line-through text-[#2C2C2C] ml-1 md:ml-4">
          ₹2,499
        </h1>
        <div className="ml-2 md:ml-4 bg-[#C84253] w-[52px] h-[18px] rounded-[2px] text-white text-[10px] flex justify-center items-center">
          50% OFF
        </div> */}
      </div>
    </div>
  );
};

export default ProductCard2;
