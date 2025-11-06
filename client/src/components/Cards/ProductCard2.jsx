import { URL } from "@/Common/api";
import React from "react";
import { IoMdStar } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import ProgressiveImage from "../ProgressiveImage";

const ProductCard2 = ({ star, className, product, priority = false }) => {
  const navigate = useNavigate();
  const originalPrice = product.offer
    ? Math.round(product.price / (1 - product.offer / 100))
    : product.price;
  const slug = slugify(product.name, { lower: true, strict: true });
  
  return (
    <div
      className={`mb-4 max-w-full min-h-[303px] flex flex-col cursor-pointer ${className}`}
      onClick={() => {
        navigate(`/product/${product._id}/${slug}`);
      }}
    >
      <div className="w-full">
        <ProgressiveImage
          src={`${URL}/img/${product && product.imageURL}`}
          alt={product && product.name}
          className="h-[200px] md:h-[400px] w-full object-cover rounded-md"
          width={400}
          height={400}
          quality={85}
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="font-Inter text-base mt-2 text-[#c74252] font-normal">
        {product && product.name}
      </div>
      {star && (
        <div className="flex text-[#CC4254] mt-2">
          {[...Array(5)].map((_, index) => (
            <IoMdStar 
              key={index} 
              className={`h-4 w-4 ${
                index < (product.rating || 5) ? 'text-[#CC4254]' : 'text-gray-300'
              }`} 
            />
          ))}
          {product.numberOfReviews > 0 && (
            <span className="ml-2 text-sm text-gray-600">
              ({product.numberOfReviews})
            </span>
          )}
        </div>
      )}
      <div className="mt-2 flex items-center justify-between">
        <div className="flex items-center flex-wrap gap-2">
          <span className="text-base font-semibold text-[#c74252]">
            ₹{product.price.toLocaleString()}
          </span>
          {product.offer && (
            <>
              <span className="text-sm font-light text-[#c74252] line-through">
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
