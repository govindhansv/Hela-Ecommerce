import React, { useEffect, useState } from "react";
import ProductCard3 from "../Cards/ProductCard3";
import axios from "axios";
import { URL } from "@/Common/api";
import { config } from "@/Common/configurations";

const ShopCategories = () => {
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
    <div className="my-4 pb-8 flex flex-col items-center w-full bg-[#fec9d1] ">
      <h1 className="text-white font-semibold text-[30px] my-6 text-center">
        Shop by Categories 
        {/* [#c74252] */}
      </h1>
      <div className="w-full mx-auto px-3 grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-3">
        {categories.map((item, index) => {
          return (
            <div key={item._id} className="w-full">
              <ProductCard3 item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShopCategories;
