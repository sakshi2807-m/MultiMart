import React from 'react';
import { FaArrowRight } from "react-icons/fa";
import vendorGrpProfile from "../assets/vendorGrpProfile.png";
import vendors from "../assets/3vendors.png";

const HeroSection = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-gray-800 rounded-lg px-6 md:px-10 lg:px-20 h-auto md:h-130 mt-10'>
      
      {/* left side */}
      <div className='md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]'>
        <p className='text-white text-3xl md:text-4xl lg:text-5xl font-semibold md:leading-tight lg:leading-tight'>
          Book Services <br /> With Trusted Vendors
        </p>
        <div className='flex items-center gap-2'>
          <img src={vendorGrpProfile} alt="" className='w-15 md:w-25 shadow-xl' />
          <p className='text-white text-sm md:text-base font-semibold'>
            Simply browse through our extensive list of trusted vendors & <span className='text-xl'>book their services</span>
          </p>
        </div>
        <a href="#category" className='font-semibold flex items-center text-green-500 bg-white text-lg rounded-4xl  border-black border px-4 py-2 hover:scale-105 transition duration-300'>
          Book Services 
          <FaArrowRight className='ml-2'  />
        </a>
      </div>

      {/* right side */}
      <div className='md:w-1/2 relative'>
        <img src={vendors} alt="" className='w-full h-auto' />
      </div>
    </div>
  );
}

export default HeroSection;