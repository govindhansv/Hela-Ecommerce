import React from 'react'
import { Button } from "@/components/ui/button"


const About = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16">
          <h1 className="text-[45px] text-[#701627] mb-12">About us</h1>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-16">
            <div className="rounded-lg flex items-start overflow-hidden w-[300px] h-[400px] p-4 md:w-[400px] md:h-[500px]">
              <img
                alt="Jewelry"
                className="object-contain w-full h-full"
                height="500"
                src="https://raw.githubusercontent.com/sreenath256/Helah/master/src/assets/AboutPageImage1.png"
                style={{
                  aspectRatio: "400/400",
                  objectFit: "contain",
                }}
                width="400"
              />
            </div>
            <div className="max-w-md space-y-6 p-3">
              <h2 className="text-[55px] text-[#701627]">Adorn Yourself With Our Classics</h2>
              <p className="text-lg font-Inter font-light">
                Welcome to helah, where every piece tells a story of affordable glamour. Proudly made in India with a
                passion for blending style and accessibility, we bring you imitation jewelry that mirrors the beauty of real
                gems. Join us on this journey of adornment, where each piece at helah is more than an accessory – it's a
                reflection of your unique style.
              </p>
              <Button className="bg-[#CC4254] w-[230px] h-[52px]  font-Inter text-lg hover:bg-[#973b47] p-6 text-white">Explore our collections</Button>
            </div>
          </div>
          
          <div className="bg-[#FFEFF1] rounded-2xl p-32 mt-20">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
        <div className="w-full flex items-start flex-col justify-center text-left md:pr-8">
          <h2 className="text-5xl text-[#701627] mb-6">Brand Story</h2>
          <p className="text-lg font-Inter font-light text-black space-y-3">
            Helah Jewels came from a legacy of passion, hard work, and a family vision. It all began in 2005 when my
            father started a small wholesale jewelry business. With dedication and a dream to offer affordable luxury, he
            built it into a trusted brand, expanded into multiple branches, and established our own production company with
            over 50 skilled artisans.
          </p>
          <p className="text-lg font-Inter font-light text-black mt-4">
            Our collections quickly became known for their high quality, customizable finishes, and lasting shine, all
            crafted with care and precision. After finishing my Plus Two, I felt inspired to carry this legacy into a new
            direction. I studied Digital Marketing and launched my own online jewelry business, making our handcrafted
            designs available to customers everywhere.
          </p>
          <p className="text-lg font-Inter font-light text-black mt-4">
            Today, Helah Jewels has over 100 happy customers and continues to grow every day. I balance my studies with
            managing the brand, remaining committed to our family’s values of quality, trust, and creativity. Helah Jewels
            is more than just a brand, it’s a dream that began with my father and continues with me.
          </p>
          <Button className="mt-6 bg-[#CC4254] w-[230px] h-[52px] font-Inter text-lg hover:bg-[#973b47] p-6 text-white ">Explore our collections</Button>
        </div>
        <div className="w-full ">
          <div className="relative">
            <img
              alt="Jewelry"
              className="w-full h-auto "
              height="300"
              src="https://raw.githubusercontent.com/sreenath256/Helah/master/src/assets/AboutPageImage2.png"
              style={{
                aspectRatio: "300/300",
                objectFit: "contain",
              }}
              width="200"
            />
            
          </div>
        </div>
      </div>
    </div>
  
        </div>
      )
}

export default About