import React from 'react';
import ContactUs from '../assets/ContactUs.png';

const Contact = () => {
  return (
    <div className='text-white mb-20 px-4 sm:px-8 md:px-16 transition-all duration-300'>

      {/* Header */}
      <div className='border-t-2 border-l-2 border-r-2 border-green-500 py-3'>
        <p className='text-gray-400 font-medium text-center'>
          CONTACT <span className='text-white font-semibold border-b-2 border-green-500'>US</span>
        </p>
      </div>

      {/* Main Content */}
      <div className='flex flex-col md:flex-row gap-10 md:gap-20 items-center justify-center mt-10 transition-all duration-300'>

        {/* Image */}
        <img 
          src={ContactUs} 
          alt="Contact Us" 
          className='w-[90%] sm:w-[70%] md:w-[350px] border border-white rounded-2xl p-2 bg-green-400 transition-all duration-500 hover:scale-105' 
        />

        {/* Contact Details */}
        <div className='flex flex-col gap-5 text-center md:text-left w-full max-w-md'>

          <p className='text-green-500 font-medium text-xl'>Our Office</p>
          <p className='text-sm text-gray-400'>
            SCSIT Davv, Tashila Parisar <br />
            Near Bhawarkua, Indore 452001
          </p>

          <p className='text-sm'>
            <span className='text-green-500 font-semibold'>Tel:</span> (+91) 98765-4321 <br />
            <span className='text-green-500 font-semibold'>Email:</span> Multimart@gmail.com
          </p>

          <div>
            <p className='text-green-500 font-medium'>Career At Multimart</p>
            <p className='text-sm text-gray-400'>Learn more about our team and job openings.</p>
          </div>

          <div>
            <button className='border border-green-500 px-4 py-2 rounded-full text-white font-semibold cursor-pointer hover:bg-green-600 hover:scale-105 transition-all duration-300'>
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
