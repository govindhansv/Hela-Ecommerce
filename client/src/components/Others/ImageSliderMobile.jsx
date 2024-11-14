import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { URL } from "@/Common/api";
import axios from "axios";
import { config } from "@/Common/configurations";

const ImageSliderMobile = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`${URL}/public/banners`, config);
      setImages(data.banners.images);
    } catch (error) {
      console.error("Error loading banner images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  if (isLoading) {
    return <div className="h-full w-full bg-gray-200 animate-pulse" />;
  }

  if (!images.length) {
    return (
      <div className="h-full w-full bg-gray-100 flex items-center justify-center">
        No images available
      </div>
    );
  }

  return (
    <div className="h-full w-full m-auto relative group">
      <div
        style={{
          backgroundImage: `url(${URL}/img/${images[currentIndex]})`,
          // backgroundImage: `url(https://server.helah.in/api/img/1731476164994-bannernew.jpg)`,
          backgroundPosition: "center",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
        className="w-full h-full md:rounded-[20px] transition-opacity duration-500"
      >
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <Button className="hover:bg-[#CC4254] bg-white hover:text-white text-[#CC4254] w-[156px] h-[48px] rounded-[5px] border border-white font-Inter text-[15px]">
            <a href="/collections" className="">
              Explore now
            </a>
          </Button>
        </div>
      </div>

      {/* Left Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <ChevronLeft onClick={prevSlide} size={30} />
      </div>

      {/* Right Arrow */}
      <div className="hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <ChevronRight onClick={nextSlide} size={30} />
      </div>

      {/* Dots */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 py-2">
          {images.map((_, slideIndex) => (
            <button
              key={slideIndex}
              onClick={() => goToSlide(slideIndex)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentIndex === slideIndex ? "bg-[#CC4254]" : "bg-gray-400"
              }`}
              aria-label={`Go to slide ${slideIndex + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageSliderMobile;
