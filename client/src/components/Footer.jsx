import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-center md:text-left rounded-xl ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center">
            <img
              alt="Logo"
              className="h-16 w-16"
              height="64"
              src={
                "https://raw.githubusercontent.com/sreenath256/Helah/master/src/assets/Group12.png"
              }
              style={{
                aspectRatio: "64/64",
                objectFit: "contain",
              }}
              width="64"
            />
            <h2 className="mt-2 text-[35px] text-[#2C2C2C]">
              Here your imitate collection
            </h2>
          </div>
          <div>
            <h3 className="text-[22px] text-[#2C2C2C] font-semibold mb-4">
              Quick links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  className="text-[#777777] font-Inter hover:text-gray-800"
                  href="#"
                >
                  <Link to="/">Home</Link>
                </a>
              </li>
              <li>
                <a
                  className="text-[#777777] font-Inter hover:text-gray-800"
                  href="#"
                >
                  <Link to="/collections">Collections</Link>
                </a>
              </li>
              <li>
                <a
                  className="text-[#777777] font-Inter hover:text-gray-800"
                  href="#"
                >
                  <Link to="/about">About us</Link>
                </a>
              </li>
              <li>
                <a
                  className="text-[#777777] font-Inter hover:text-gray-800"
                  href="#"
                >
                  <Link to="contact">Contact us</Link>
                </a>
              </li>
            </ul>
          </div>
          <div className="md:border-r border-r-[#777777]">
            <h3 className="text-[22px] text-[#2C2C2C] font-semibold mb-4">
              Quick links
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  className="text-[#777777] font-Inter hover:text-gray-800"
                  href="#"
                >
                  Customer support
                </a>
              </li>
              <li>
                <a
                  className="text-[#777777] font-Inter hover:text-gray-800"
                  href="#"
                >
                  Terms & conditions
                </a>
              </li>
              <li>
                <a
                  className="text-[#777777] font-Inter hover:text-gray-800"
                  href="#"
                >
                  Exchange
                </a>
              </li>
              <li>
                <a
                  className="text-[#777777] font-Inter hover:text-gray-800"
                  href="#"
                >
                  Shipping & delivery
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-[30px] text-[#2C2C2C] mb-4">Get in touch</h3>
            <p className="mb-4 text-[#777777] font-Inter">
              Get up to 20% discount on your first order!
            </p>
            <form className="flex justify-between bg-white rounded-full">
              <input
                className="px-4 py-2 font-Inter text-[#777777] focus:outline-none rounded-full "
                placeholder="Enter your email"
                type="email"
              />
              <button
                className="px-4 py-2 bg-white text-[#777777] rounded-full hover:bg-white"
                type="submit"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-envelope"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;