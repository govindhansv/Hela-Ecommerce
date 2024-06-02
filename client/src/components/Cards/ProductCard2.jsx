import React from "react";
import { IoMdStar } from "react-icons/io";
const ProductCard2 = ({ star,className }) => {
  return (
    <div className={`m-4 max-w-[264px] min-h-[403px] flex flex-col ${className} `}>
      
      <div className="w-full ">
      {/* // src="https://images.unsplash.com/photo-1588909006332-2e30f95291bc?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZGlhbW9uZCUyMGNoYWlufGVufDB8fDB8fHww" */}

        <img
          className="h-[330px] w-full object-cover rounded-md"
          src="https://s3-alpha-sig.figma.com/img/8559/7d0e/03476b469b15ba0d7d44d39d5e38ba64?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BRLayoM4Qzpg4H-oY9jvFTR63ojrH26BAfdje3PSQSjiTlyC-PgWBOO3iifVQtAxtOiiHaYPE5RZZNWDwRTbKxYndduBoJRZHGyqrsDwKK6w7YccynKmIxI-JuWaQ5zwqbSJEu8gGPYBl4wsTKPQ8efULzXOjKATCuKnxzCcGn-TGjSxAIqXxIcLd8jDsBvU~fFw4V5YqszC2P6CSTMJvP~mVTtvNU~SbEKdOwXA-7DKXKC08j6C-~r58MqqrPzVpReQZRQF5HIAgEyIIbUEDr-RNYCoFjxJ22L-38QxQzW8Fla7tO-WUFW3tXE3BapHjZ~JGGS2SSx~qxFwGuGknA__"
          alt=""
        />
      </div>
      <div className="font-Inter text-lg mt-2 text-[#2C2C2C] font-normal">
        Silver Temple Chain
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
        <h1 className="font-Inter text-[22px] text-[#2C2C2C]">₹1,999</h1>
        <h1 className="font-Inter text-[14px] line-through text-[#2C2C2C] ml-1 md:ml-4">
          ₹2,499
        </h1>
        <div className="ml-2 md:ml-4 bg-[#C84253] w-[52px] h-[18px] rounded-[2px] text-white text-[10px] flex justify-center items-center">
          50% OFF
        </div>
      </div>
    </div>
  );
};

export default ProductCard2;