import React from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import  { useState } from "react";


const DropDown = ({title}) => {
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
    <div
      className="flex items-center w-[300px] h-[60px] pl-4 justify-between border-b-[#5F5F5F] border-b-[0.5px] cursor-pointer"
      onClick={() => handleClick("div1")}
    >
      <h1 className="font-Inter text-[20px] font-light ml-4">{title}</h1>

      <RiArrowDropDownLine
        className={`text-4xl font-[100] transition-transform duration-300 ${
          toggleStates.div1 ? "rotate-180" : "rotate-0"
        }`}
      />
    </div>
  );
};

export default DropDown;