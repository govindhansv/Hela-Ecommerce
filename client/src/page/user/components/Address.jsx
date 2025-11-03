import React, { useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import InputType from "../components/InputType";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { createAddress } from "../../../redux/actions/user/addressActions";
// import { Country, State, City } from "country-state-city";
import SearchInput from "./SearchInput";

const Address = ({ closeToggle }) => {
  const dispatch = useDispatch();
  // const countries = Country.getAllCountries();
  let [states, setStates] = useState([]);
  let [cities, setCities] = useState([]);
  const INDIAN_STATES = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  const initialValues = {
    firstName: "",
    lastName: "",
    companyName: "",
    address: "",
    country: "India",
    regionState: "",
    city: "",
    pinCode: "",
    email: "",
    phoneNumber: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    companyName: Yup.string(),
    address: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
    regionState: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    pinCode: Yup.number()
      .required("Required")
      .moreThan(99999, "Pin code should be at-least 6 digit")
      .typeError("Pin code should be digits"),
    email: Yup.string().email("Invalid Email"),
    phoneNumber: Yup.number()
      .typeError("Phone number should be digits")
      .moreThan(999999999, "Not valid phone number")
      .required("Phone number is required"),
  });

  const handleSubmit = (value) => {
    // console.log(value);
    dispatch(createAddress(value));
  };

  // const handleCountrySelect = (country) => {
  //   const state = State.getStatesOfCountry(country.isoCode);
  //   setStates(state);
  // };
  // const handleSelectState = (state) => {
  //   const city = City.getCitiesOfState(state.countryCode, state.isoCode);
  //   setCities(city);
  // };

  return (
    <div className="bg-gray-100 w-5/6 shadow-2xl overflow-y-scroll h-screen lg:h-auto rounded-lg ">
      <div className="bg-white pt-5 pb-3 px-5 flex items-center justify-between">
        <h1 className="font-bold text-lg ">Delivery Address</h1>
        <AiOutlineClose
          className="text-xl cursor-pointer"
          onClick={closeToggle}
        />
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="px-5 pb-5">
            <div className="lg:flex gap-5 justify-stretch">
              <InputType
                name="firstName"
                placeholder="Your first name"
                title="First Name"
              />
              <InputType
                name="lastName"
                placeholder="Your last name"
                title="Last Name"
              />
              <InputType
                name="companyName"
                placeholder="Your company name"
                title="Company Name"
                optional={true}
              />
            </div>
            <InputType name="address" placeholder="" title="Address" />
            <div className="lg:flex gap-5 justify-stretch">
              <div className="text-sm my-2 w-full">
                <p className="my-1 font-semibold">
                  <label>Country</label>
                </p>
                <select
                  name="country"
                  value={values.country}
                  onChange={(e) => {
                    setFieldValue("country", e.target.value);
                    setFieldValue("regionState", "");
                  }}
                  className={`border bg-white focus:border-blue-500 border-gray-200 px-3 py-2 rounded outline-none w-full`}
                >
                  <option value="India">India</option>
                  <option value="Outside India">Outside India</option>
                </select>
              </div>

              <div className="text-sm my-2 w-full">
                <p className="my-1 font-semibold">
                  <label>State/Region</label>
                </p>
                {values.country === "India" ? (
                  <select
                    name="regionState"
                    value={values.regionState}
                    onChange={(e) => setFieldValue("regionState", e.target.value)}
                    className={`border bg-white focus:border-blue-500 border-gray-200 px-3 py-2 rounded outline-none w-full`}
                  >
                    <option value="">Select State</option>
                    {INDIAN_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                ) : (
                  <InputType
                    name="regionState"
                    placeholder="Your state/region"
                    title="State/Region"
                  />
                )}
              </div>

              <InputType name="city" placeholder="Your city" title="City" />
            </div>
            <div className="lg:flex gap-5 justify-stretch">
              {/* <SearchInput
                onInput={setFieldValue}
                onSelect={handleCountrySelect}
                data={countries}
                title={"Country"}
                placeholder={"Select your country"}
                name={"country"}
              />
              <SearchInput
                onInput={setFieldValue}
                onSelect={handleSelectState}
                data={states}
                title={"State/Region"}
                placeholder={"Select your state"}
                name={"regionState"}
              />
              <SearchInput
                onInput={setFieldValue}
                onSelect={() => {}}
                data={cities}
                title={"City"}
                placeholder={"Select your City"}
                name={"city"}
              /> */}

              <InputType name="pinCode" placeholder="" title="Pin Code" />
            </div>
            <InputType name="email" placeholder="" title="Email" />
            <InputType name="phoneNumber" placeholder="" title="Phone Number" />
            <button type="submit" className="btn-blue text-white">
              Save
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Address;
