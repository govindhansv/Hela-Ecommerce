import React from "react";
import ImageSlider from "@/components/Others/ImageSlider";
import FlashSaleBanner from "@/components/Others/FlashSaleBanner";
import HelahPromis from "@/components/Others/HelahPromis";
import BestSellers from "@/components/Others/BestSellers";
import ShopCatogories from "@/components/Others/ShopCatogories";
import ImageSliderMobile from "@/components/Others/ImageSliderMobile";

const Home = () => {
  return (
    <div>
      <div className="w-full hidden md:flex h-[640px] bg-[#FFEFF1] justify-center">
        <ImageSlider />
      </div>
      <div className="bg-[#FFEFF1]">
        <div className="w-full flex md:hidden h-[250px] bg-[#FFEFF1] justify-center">
          <div className=" w-full flex md:hidden h-[250px] bg-[#FFEFF1] justify-center ">
            <ImageSliderMobile />
          </div>
        </div>

        {/* <div className="mt-6">
          <FlashSaleBanner />
        </div> */}
      </div>
      <div className="mt-8 ">
        <ShopCatogories />
      </div>
      {/* <div className="mt-8">
        <RecentlyViewed />
      </div> */}
      <div className="mt-8 md:mx-8 ">
        <BestSellers />
      </div>
      <div className="sm:mt-24">
        <HelahPromis />
      </div>
    </div>
  );
};

export default Home;
