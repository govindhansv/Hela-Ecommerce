import React from "react";
import ImageSlider from "@/components/Others/ImageSlider";
import FlashSaleBanner from "@/components/Others/FlashSaleBanner";
import HelahPromis from "@/components/Others/HelahPromis";
import BestSellers from "@/components/Others/BestSellers";
import ShopCatogories from "@/components/Others/ShopCatogories";
import ImageSliderMobile from "@/components/Others/ImageSliderMobile";
import OurStory from "@/components/Others/OurStory";

const Home = () => {
  return (
    <div className="bg-[#fec9d1]">
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
      <ShopCatogories />
      {/* <div className="mt-8">
        <RecentlyViewed />
      </div> */}
      <BestSellers />
      <OurStory />
      <HelahPromis />
    </div>
  );
};

export default Home;
