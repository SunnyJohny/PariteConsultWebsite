import React from "react";
import { BsArrowRight } from "react-icons/bs";
import { Link } from "react-scroll";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import equipmentData from "../data/equipmentData";

const Hero = () => {
  return (
    <div className="banner cs-style1 relative" id="home">
      {/* Image Slider */}
      <Swiper
        modules={[Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={1500}
        loop={true}
        className="h-96"
      >
        {equipmentData.map((equipment, index) => (
          <SwiperSlide key={index} className="relative group">
          {/* Image */}
          <img
            src={equipment.image}
            alt={equipment.name}
            className="w-full h-full object-cover"
          />
        
          {/* Apply Overlay Only on the First Image */}
          {index === 0 && <div className="absolute inset-0 bg-black bg-opacity-50"></div>}
        
          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10">
            <h2
              className={`text-4xl font-extrabold mb-6 leading-tight break-words text-center ${
                index === 0
                  ? "text-white font-Poppins shadow-lg mt-[-10px] lg:hidden"
                  : "text-[#de5c50] font-Moserate, sans-serif"
              } animate-drop`}
            >
              {index === 0 ? " " : ""}
              {equipment.name}
            </h2>
        
            {index === 0 && (
              <div className="relative text-center">
                {/* Welcome Message */}
                <h3 className="text-[22px] font-extrabold text-yellow-300 drop-shadow-md">
                  ⚡ Welcome to PARITE CONSULTS ⚡
                </h3>
        
               <p className="text-[20px] text-white font-extrabold mt-6 px-4 lg:px-32">
  Delivering <span className="text-blue-500">Reliable</span>{" "}
  Building Solutions &{" "}
  <span className="text-blue-500">Top-Quality</span> Construction Services
</p>
        
                <div className="absolute inset-x-0 bottom--16 flex justify-center">
                  <a
                    href="https://wa.me/2348068933906?text=Thanks%20for%20contacting%20us!"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className="px-6 py-2 border-2 border-green-400 text-green-400 bg-transparent rounded-full hover:bg-green-400 hover:text-white hover:scale-105 transition-transform duration-300 shadow-md">
                      Contact Us
                    </button>
                  </a>
                </div>
              </div>
            )}
        
            {index !== 0 && (
              <button
                className="px-6 py-2 border-2 border-green-400 text-green-400 bg-transparent rounded-full hover:bg-green-400 hover:text-white hover:scale-105 transition-transform duration-300 shadow-md"
                onClick={() =>
                  window.open(
                    "https://wa.me/2348068933906?text=Hello!%20I%20am%20interested%20in%20your%20product.",
                    "_blank"
                  )
                }
              >
                Contact Us
              </button>
            )}
          </div>
        </SwiperSlide>
        
        ))}
      </Swiper>

      {/* Additional Banner Content */}
      <div className="px-4 lg:px-24 mt-8">
        <h1 className="md:w-2/3 lg:text-8xl sm:text-6xl text-5xl mb-5 text-white font-bold lg:leading-snug sm:leading-snug leading-snug"></h1>
        <div className="text-white text-lg flex flex-col-reverse md:flex-row md:items-center items-start justify-between gap-8">
          <div>
            <Link
              to="contact"
              smooth={true}
              offset={-100}
              duration={500}
              className="inline-flex items-center gap-2 font-semibold hover:text-orange transition-all duration-300 cursor-pointer"
            >
              <span>Get a Quote</span>
              <BsArrowRight />
            </Link>
          </div>
          <div className="md:w-1/2">
           <p className="cs-hero_subtitle">
  Building the future with innovative design and quality construction solutions.
</p>
          </div>
        </div>
      </div>

      {/* Scroll Arrow to Service Section */}
      <Link to="services" spy={true} smooth={true} className="cs-down_btn md:mt-20 mt-8">
        .
      </Link>
    </div>
  );
};

export default Hero;
