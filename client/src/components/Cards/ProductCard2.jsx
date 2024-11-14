import { URL } from "@/Common/api";
import React from "react";
import { IoMdStar } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const ProductCard2 = ({ star, className, product }) => {
  const navigate = useNavigate();
  const originalPrice = product.offer
    ? Math.round(product.price / (1 - product.offer / 100))
    : product.price;

  return (
    <div
      className={`mb-4 max-w-full min-h-[303px] flex flex-col cursor-pointer ${className}`}
      onClick={() => {
        navigate(`/product/${product._id}`);
      }}
    >
      <div className="w-full">
        <img
          className="h-[200px] md:h-[400px] w-full object-cover rounded-md"
          src={`${URL}/img/${product && product.imageURL}`}
          alt={product && product.name}
        />
      </div>
      <div className="font-Inter text-base mt-2 text-[#2C2C2C] font-normal">
        {product && product.name}
      </div>
      {star && (
        <div className="flex text-[#CC4254] mt-2">
          <IoMdStar className="h-4 w-4" />
          <IoMdStar className="h-4 w-4" />
          <IoMdStar className="h-4 w-4" />
          <IoMdStar className="h-4 w-4" />
          <IoMdStar className="h-4 w-4" />
        </div>
      )}
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center flex-wrap gap-2">
          <span className="text-base font-semibold text-gray-800">
            ₹{product.price.toLocaleString()}
          </span>
          {product.offer && (
            <>
              <span className="text-sm font-light text-gray-400 line-through">
                ₹{originalPrice.toLocaleString()}
              </span>
              <span className="px-2 py-1 text-xs font-medium text-white bg-[#C84253] rounded">
                {product.offer}% OFF
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard2;
