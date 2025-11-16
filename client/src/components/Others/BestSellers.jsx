import React, { useEffect } from "react";
import ProductCard2 from "../Cards/ProductCard2";
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
    // dispatch(getWishlist());
    dispatch(getUserProducts(searchParams));

    // const params = new URLSearchParams(window.location.search);
    // const pageNumber = params.get("page");
    // setPage(parseInt(pageNumber || 1));
  }, [searchParams]);

  return (
    <div className="my-4 pb-8 flex flex-col items-center w-full bg-[#fec9d1]">
      <h1 className="text-[30px] font-semibold text-[#701627] text-center my-6">Best Sellers</h1>
      {/* text-[#c74252] #701627 */}
      <div className="w-full flex flex-wrap justify-center px-3">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <JustLoading size={10} />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-5">
            {userProducts && userProducts.length > 0 ? (
              userProducts
                .slice(0, 4)
                .map((pro, index) => (
                  <ProductCard2
                    star={true}
                    className="{w-[15%]}"
                    product={pro}
                    key={index}
                  />
                ))
            ) : (
              <div className="h-96">
                <p>Nothing to show</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BestSellers;
