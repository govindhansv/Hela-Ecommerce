import React from "react";
import HelahLogo from "@/assets/Helah_Logo_red.jpg";

const OurStory = () => {
  return (
    <section className="w-full bg-[#fec9d1] py-10 lg:py-16 flex justify-center">
      <div className="w-full px-4 sm:px-8 lg:px-24">
        <h2 className="text-[#701627] text-2xl md:text-3xl lg:text-4xl font-semibold text-center mb-6">
          Our Story
        </h2>
        <div className="bg-white/70 rounded-xl shadow-sm px-4 sm:px-8 lg:px-12 py-6 md:py-8 flex flex-col md:flex-row items-center gap-8 md:gap-10">
          <div className="w-full md:w-1/3 flex justify-center">
            <img
              src={HelahLogo}
              alt="Helah Jewels Logo"
              className="max-h-40 w-auto object-contain drop-shadow-sm"
            />
          </div>
          <div className="w-full md:w-2/3 text-sm md:text-base leading-relaxed text-[#2C2C2C] space-y-4 font-Inter">
            <p>
              Helah Jewels came from a legacy of passion, hard work, and a
              family vision.
            </p>
            <p>
              It all began in 2005 when my father started a small wholesale
              jewelry business. With dedication and a dream to offer affordable
              luxury, he built it into a trusted brand, expanded into multiple
              branches, and established our own production company with over 50
              skilled artisans.
            </p>
            <p>
              Our collections quickly became known for their high quality,
              customizable finishes, and lasting shine, all crafted with care
              and precision.
            </p>
            <p>
              After finishing my Plus Two, I felt inspired to carry this legacy
              into a new direction. I studied Digital Marketing and launched my
              own online jewelry business, making our handcrafted designs
              available to customers everywhere.
            </p>
            <p>
              Today, Helah Jewels has over 100 happy customers and continues to
              grow every day. I balance my studies with managing the brand,
              remaining committed to our family’s values of quality, trust, and
              creativity.
            </p>
            <p>
              Helah Jewels is more than just a brand; it’s a dream that began
              with my father and continues with me.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurStory;
