import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { RiArrowDropDownLine } from "react-icons/ri";
import ProductCard2 from "@/components/Cards/ProductCard2";
import DropDown from "@/components/Others/DropDown";
import { getWishlist } from "@/redux/actions/user/wishlistActions";
import { getUserProducts } from "@/redux/actions/user/userProductActions";
import JustLoading from "@/components/JustLoading";
import { config } from "@/Common/configurations";
import { URL } from "@/Common/api";
import axios from "axios";
import { id } from "date-fns/locale";
import SearchBar from "@/components/SearchBar";
import SortButton from "@/components/SortButton";

const Collections = () => {
  const { userProducts, loading, error, totalAvailableProducts } = useSelector(
    (state) => state.userProducts
  );
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState([]);
  const [price, setPrice] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const priceParam = searchParams.get("price");
    const searchParam = searchParams.get("search");
    const sortParam = searchParams.get("sort");
    const page = searchParams.get("page");

    setCategory(categoryParam ? categoryParam.split(",") : []);
    setPrice(priceParam || "");
    setSort(sortParam || "");
    setPage(page || 1);
    setSearch(searchParam || "");
  }, [searchParams]);

  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    const { data } = await axios.get(`${URL}/user/categories`, config);
    setCategories(data.categories);
    console.log(data.categories);
  };
  useEffect(() => {
    loadCategories();
  }, []);

  const handleClick = (param, value) => {
    const params = new URLSearchParams(window.location.search);

    if (value === "" || (param === "page" && value === 1)) {
      params.delete(param);
      if (param === "price") {
        setPrice("");
      }
      if (param === "sort") {
        setSort("");
        params.delete("page");
        setPage(1);
      }
    } else {
      if (param === "category" && value) {
        let cat = params.get("category");
        if (!cat) {
          params.append("category", value);
          setCategory([value]);
        } else {
          let temp = cat.split(",");
          if (temp.length > 0) {
            if (temp.includes(value)) {
              temp = temp.filter((item) => item !== value);
            } else {
              temp.push(value);
            }

            if (temp.length > 0) {
              params.set("category", temp.join(","));
              setCategory(temp);
            } else {
              params.delete("category");
              setCategory([]);
            }
          } else {
            params.delete("category");
            setCategory([]);
          }
        }
      } else {
        params.set(param, value);
        if (param === "price") {
          setPrice(value);
          params.delete("page");
          setPage(1);
        }
        if (param === "sort") {
          setSort(value);
          params.delete("page");
          setPage(1);
        }
        if (param === "search") {
          params.delete("page");
          setPage(1);
        }
      }
    }

    setSearchParams(params.toString() ? "?" + params.toString() : "");
  };

  // Handle sub-item clicks
  const handleSubItemClick = (filterType, value) => {
    handleClick(filterType.toLowerCase(), value);
  };

  useEffect(() => {
    dispatch(getWishlist());
    dispatch(getUserProducts(searchParams));

    const params = new URLSearchParams(window.location.search);
    const pageNumber = params.get("page");
    setPage(parseInt(pageNumber || 1));
  }, [searchParams]);

  // Clear all filters
  const clearFilters = () => {
    const params = new URLSearchParams();

    params.delete("category");
    params.delete("price");
    params.delete("search");
    params.delete("sort");
    params.delete("page");

    setSearchParams(params);

    setSearch("");
    setPrice("");
    setCategory([]);
    setPage(1);
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
          <SortButton handleClick={handleClick} sort={sort} />

        </div>
        <div>
          <div className="flex flex-col md:flex-row min-h-screen mt-10">
            <aside className="w-full hidden lg:block md:w-80 bg-white overflow-y-auto py-6">
              <div className="mt-4 space-y-2">
                <div className="flex items-center w-[300px] h-[60px] pl-4 bg-[#F2F2F2] rounded-[10px]">
                  <FilterIcon />
                  <h1 className="font-Inter text-[22px] ml-4">Filter</h1>
                </div>
                <DropDown
                  title="price"
                  text="Price"
                  // subItems={[
                  //   {
                  //     _id: '665c8b776f413c3d6fc3574e',
                  //     name: 'Pendent',
                  //     description: 'Pendent',
                  //     imgURL: '1717341047422-Pendent.png',
                  //     isActive: true,
                  //     createdAt: '2024-06-02T15:10:47.492Z',
                  //     updatedAt: '2024-06-02T15:10:47.492Z',
                  //     __v: 0
                  //   },
                  //   {
                  //     _id: '665c8d3f6f413c3d6fc35761',
                  //     name: 'Finger Rings',
                  //     description: 'Finger Rings',
                  //     imgURL: '1717341503203-Finger Rings.png',
                  //     isActive: true,
                  //     createdAt: '2024-06-02T15:18:23.270Z',
                  //     updatedAt: '2024-06-02T15:18:23.270Z',
                  //     __v: 0
                  //   }]}
                  subItems={[
                    // make thses same as he did then it will works
                    { name: "All Price", _id: "" },
                    { name: "Under 25000", _id: "Under 25000" },
                    { name: "25000-50000", _id: "25000-50000" },
                    { name: "50000-100000", _id: "50000-100000" },
                    { name: "Above 300000₹", _id: "Above 300000" },
                  ]}
                  onSubItemClick={handleSubItemClick}
                />
                <DropDown
                  title="category"
                  text="Jewelry Type"
                  // subItems={["jhfsdjfsh", "Necklaces", "Earrings", "Bracelets"]}
                  subItems={categories}
                  onSubItemClick={handleSubItemClick}
                />
                {/* <DropDown
                  title="Sub Jewelry Type"
                  subItems={[
                    "Engagement Rings",
                    "Wedding Bands",
                    "Charm Bracelets",
                  ]}
                  onSubItemClick={handleSubItemClick}
                />
                <DropDown
                  title="Color"
                  subItems={["Gold", "Silver", "Rose Gold", "Platinum"]}
                  onSubItemClick={handleSubItemClick}
                />
                <DropDown
                  title="Size"
                  subItems={["Small", "Medium", "Large"]}
                  onSubItemClick={handleSubItemClick}
                />
                <DropDown
                  title="Material"
                  subItems={["Gold", "Silver", "Platinum", "Diamond"]}
                  onSubItemClick={handleSubItemClick}
                /> */}
              </div>
            </aside>
            <div className="mb-3 lg:hidden">
              <FilterIcon />
            </div>
            <main className="flex-1 overflow-y-auto">
              <div className="md:p-5">
                {loading ? (
                  <div className="flex justify-center items-center h-96">
                    <JustLoading size={10} />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-5">
                    {userProducts && userProducts.length > 0 ? (
                      userProducts.map((pro, index) => (
                        <ProductCard2
                          star
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
