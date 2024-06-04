import React, { useEffect } from "react";
import ProductCard2 from "../Cards/ProductCard2";
import ProductCard4 from "../Cards/ProductCard4";
import { useDispatch, useSelector } from "react-redux";
import { getUserProducts } from "@/redux/actions/user/userProductActions";
import { useSearchParams } from "react-router-dom";
import JustLoading from "../JustLoading";

const BestSellers = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { userProducts, loading, error, totalAvailableProducts } = useSelector(
    (state) => state.userProducts
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserProducts(searchParams));
  }, [searchParams]);

  return (
    <div>
      <div className="bg-[#F6F6F6] py-8 px-4 mx-8 rounded-[20px]">
        <div className="flex justify-between items-center">
          <div></div>
          <h1 className="text-[30px] text-[#2C2C2C] text-center">
            Best Sellers
          </h1>
          <div className="w-[77px] h-[38px] font-Inter border flex justify-center items-center rounded-md mr-4">
            View all
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-96">
            <JustLoading size={10} />
          </div>
        ) : (
          <div className="flex justify-center flex-wrap py-5">
            {userProducts && userProducts.length > 0 ? (
              userProducts.map((pro, index) => (
                <ProductCard2 star={true} className="w-[15%]" product={pro} key={index} />
              ))
            ) : (
              <div className="h-96">
                <p>Nothing to show</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="m-12 flex justify-center flex-wrap">
        <ProductCard4 />
        <ProductCard4 />
        <ProductCard4 />
        <ProductCard4 />
      </div>
    </div>
  );
};

export default BestSellers;
