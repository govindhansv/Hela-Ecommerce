import { RiArrowDropDownLine } from "react-icons/ri";

import React, { useState } from "react";
import ProductCard2 from "@/components/Cards/ProductCard2";
import DropDown from "@/components/Others/DropDown";

const Collections = () => {
  const [toggleStates, setToggleStates] = useState({
    div1: false,
    div2: false,
    div3: false,
  });

  const handleClick = (div) => {
    setToggleStates((prevState) => ({
      ...prevState,
      [div]: !prevState[div],
    }));
  };

  return (
    <div className="w-full">
      <div
        className="w-full h-[357px] bg-cover flex justify-center items-center text-[80px] text-white"
        style={{
          backgroundImage:
            "url(https://s3-alpha-sig.figma.com/img/27ad/f93f/3356b7047c6965fb9fba78a6ec30b548?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=T2-ncbf-PM7POAxr6EN34wEcrkAW6NrFFWyj95T9vVVRF5y-7VNom5xSNOaYdny5451KaqoD588Vba6YKdUwCqIf69KFZgjz6fPWRHWtbWbSJQmvkeIhYpJiwKsMHkaOHOYNvOy3TO7g~cVbE77u7633Kh15Wk8Lsd2w6Oi7w~QZXsa6KoCJtOhwFl11MMyXXQwTPLtMwBz5g7ZfQH1XE3E~vDpHRgUQg~Y4ijzjvlrGasCK7skjj7yV~FfZHWCZex0G4OfBgDXd83J1QuhXXPJVIK7hfOIiReaQhokile5mLSr3Pwb3MiY5jud-7S48gMGRIWdpUUPI0INJdPg5Ng__)",
        }}
      >
        PENDENTS
      </div>
      <div className="w-full py-10 px-2 md:px-10 lg:px-20 flex flex-col  justify-center">
        <div className="w-full flex  justify-between">
          <h1 className="flex justify-center items-center font-Inter ">
            <span>
              <HomeIcon color="#2C2C2C" />
            </span>
            <span className="hover:text-[#CC4254] ml-2">Necklace</span>
          </h1>
          <div className="lg:w-[406px] w-[300px] h-[50px] lg:h-[74px] font-[300] border-[1px] flex items-center  border-[#9F9F9F] rounded-[10px]">
            <div className="w-2/5 text-center text-[20px] font-Inter border-r-[1px] border-[#9F9F9F]">
              Sort by:
            </div>
            <div className="w-3/5 px-4">
              <select
                name=""
                id=""
                className="bg-white w-full font-Inter text-[20px] outline-none"
              >
                <option value="Featured">Featured</option>
                <option value="Featured">Featured</option>
                <option value="Featured">Featured</option>
                <option value="Featured">Featured</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col md:flex-row min-h-screen mt-10">
            <aside className="w-full hidden lg:block md:w-80 bg-white  overflow-y-auto py-6">
              <div className="mt-4 space-y-2">
                <div className="flex items-center w-[300px] h-[60px] pl-4 bg-[#F2F2F2] rounded-[10px]">
                  <FilterIcon />
                  <h1 className="font-Inter text-[22px] ml-4">Filter</h1>
                </div>
                <DropDown title={"Price"} />
                <DropDown title={"Jewelry Type"} /> 
                <DropDown title={"Sub Jewelry Type"} />
                <DropDown title={"Color"} />
                <DropDown title={"Size"} />
                <DropDown title={"Material"} />
              </div>
            </aside>
            <div className="mb-3 lg:hidden">
              <FilterIcon />
            </div>
            <main className="flex-1 overflow-y-auto">
              <div className="md:p-5">
                <div className=" grid  md:grid-cols-2 grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
                  <ProductCard2 star />
                  <ProductCard2 star />
                  <ProductCard2 star />
                  <ProductCard2 star />
                  <ProductCard2 star />
                  <ProductCard2 star />
                  <ProductCard2 star />
                  <ProductCard2 star />
                  <ProductCard2 star />
                  <ProductCard2 star />
                  <ProductCard2 star />
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collections;

const HomeIcon = ({ color }) => {
  return (
    <svg
      width="24"
      height="27"
      viewBox="0 0 24 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.24959 25.7504H8.21157V15.3074H15.7091V25.7504H22.6711V9.6843L11.9603 1.56198L1.24959 9.6843V25.7504ZM0 27V9.0595L11.9603 0L23.9207 9.0595V27H14.4595V16.557H9.46116V27H0Z"
        fill={color ? color : "#2C2C2C"}
      />
    </svg>
  );
};

const FilterIcon = () => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.4286 25V17.1429H13.5714V20H25V22.1429H13.5714V25H11.4286ZM0 22.1429V20H7.85714V22.1429H0ZM5.71429 16.4286V13.5714H0V11.4286H5.71429V8.57143H7.85714V16.4286H5.71429ZM11.4286 13.5714V11.4286H25V13.5714H11.4286ZM17.1429 7.85714V0H19.2857V2.85714H25V5H19.2857V7.85714H17.1429ZM0 5V2.85714H13.5714V5H0Z"
        fill="#2C2C2C"
      />
    </svg>
  );
};