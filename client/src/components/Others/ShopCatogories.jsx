import React, { useEffect, useState } from "react";
import ProductCard3 from "../Cards/ProductCard3";
import axios from "axios";
import { URL } from "@/Common/api";
import { config } from "@/Common/configurations";

const ShopCatogories = () => {
  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    const { data } = await axios.get(`${URL}/user/categories`, config);
    setCategories(data.categories);
    console.log(data.categories);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <div className=" my-4 flex flex-col items-center w-full bg-[#CC4254] py-5 pb-12 rounded-[20px]">
      <h1 className="text-white text-[30px] my-6 ">Shop by Categories</h1>
      <div className="flex flex-wrap w-full items-center justify-center">
        {categories.map((item) => {
          return <ProductCard3 key={item._id} item={item} />;
        })}
      </div>
    </div>
  );
};

export default ShopCatogories;
