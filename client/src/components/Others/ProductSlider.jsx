import React, { useState } from "react";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx";

const ProductSlider = () => {
  const slides = [
    {
      url: "https://s3-alpha-sig.figma.com/img/d617/af0d/3844e03f4e63422dadd37aa6227426d2?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Jmn2tiuNXYnY-D1KY8uWaovIThkHMlnxsrlRp0WVEJ5apvsGNu8-7TpTiYVPvweJegqA7pWesaplUf3f5UxKMoKWyLKVN3zdAV0eBsewgRk5tuxDdQTVZsjeFsB5N2zjY-v-XNepTEsXjHPQZUccjENtqBKFqr-BNWv2C2GDcef2iv16oDQpRUuY-k3-Jd-Djz1~2JfCASuOnexnwDQ7J1Ycc7jePKgme7thRzS9tcNzMpD5fYpoAp4~pGkZezr-RfOml0f89HZwegnVbdCfFGL-yUCTOhtJ8vw91eMYl2iG2Ih4mpQCmX1kU9SRgNhKhr8tNRDwORp~ppWd8NGxKA__",
    },
    {
      url: "https://s3-alpha-sig.figma.com/img/62da/19c4/b2e856a52e09b9c6e5f3de84a81c2229?Expires=1717977600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=N-Qk8cNJAAiJjIUbdmZgKghe1Sas4832W6S5JMPAxDvo8vhTJUpCrXKvSZHSL~wG~eBB4ZP453Z27rJUrHIZe-ffpUnvI5pldgTT7cooktc3PaHYj3PITeU0T~haS4DgV0NKaAc7pO2r744JBjwUaTtZ8uzhrUNHPBEVL6zFs21cPZFpHyF6woLRDSf1vHRV0BKVeaiSPWb2EVaqhr5aZXLYQUMwStxs23eA67Vj5m6vzcAJDjZcIUgwDlGQEpaMVMmRiRr4Earu34~3icwRlZ9kcG439z-yVq5rnCG3vnsSkQbEYR-HeBrarJf6dLtTyaFbhgKCIX6tkDyPMM~YUg__",
    },
    
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };
  return (
    <div className="w-full h-full   m-auto   relative group">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex].url})` }}
        className="w-full h-full  bg-center bg-cover duration-500 lg:rounded-xl"
      ></div>
      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactLeft onClick={prevSlide} size={30} />
      </div>
      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <BsChevronCompactRight onClick={nextSlide} size={30} />
      </div>
      <div className="flex top-4 justify-center py-2">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer"
          >
            <RxDotFilled className="text-[#CC4254]"/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSlider;