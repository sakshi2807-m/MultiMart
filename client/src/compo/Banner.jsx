import React from 'react'
import BannerGirl from '../assets/BannerGirl.png'
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate=useNavigate()
  return (
    <div className='text-white flex justify-center-safe items-center bg-gray-800 rounded-lg px-6 sm:px-10 lg:px-12 my-20 md:px-10'>
        {/* left side */}
        <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py24 lg:pl-5'>
            <div className=' grid text-5xl font-semibold shadow-2xl'>
                <p >Book Services</p>
                <p className='mt-2'>With Genuine Vendors</p>
                
            </div>
            <button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className='bg-white px-3 py-2 text-sm text-green-500 rounded-3xl font-semibold shadow-2xl  mt-10 hover:scale-105 transition-all duration-500'>Create Account </button>
        </div>
        {/* right side */}
        
        <div className=' md:block md:w-1/2 lg:w-[370px] ralative'>
            <img src={BannerGirl} alt=""  className='w-full bottom-0 right-0 max-w-md '/>
        </div>
    </div>
  )
}

export default Banner