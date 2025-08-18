import React from 'react'
import AboutUsImage from '../assets/AboutUsImage.png'

const About = () => {
  return (
    <div className='mb-30 px-4 sm:px-8 md:px-16 py-8'>
      {/* Heading */}
      <div className='border-t-2 border-l-2 border-r-2 border-green-500 py-3'>
        <p className='text-gray-400 font-medium text-center text-lg'>
          ABOUT <span className='text-white font-semibold border-b-2 border-green-500'>US</span>
        </p>
      </div>

      {/* About Image and Description */}
      <div className='flex flex-col lg:flex-row gap-6 mt-6 items-center'>
        <img
          src={AboutUsImage}
          alt="About Us"
          className='w-full sm:w-3/4 md:w-2/3 lg:w-[35%] border border-white bg-green-400 rounded-3xl object-cover shadow-lg'
        />

        <div className='text-white text-sm lg:text-base flex flex-col gap-6 mt-4 lg:mt-0'>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi laborum, porro numquam ab at praesentium laboriosam omnis quaerat libero magnam dolorum, rem dolores? Mollitia eos perferendis quidem! Error, doloribus. Commodi.</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati atque necessitatibus incidunt officiis ducimus rerum dignissimos quam veniam, labore quia pariatur, corporis sapiente, corrupti non.</p>

          <div>
            <p className='text-green-500 font-semibold text-base mb-1'>OUR VISION</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Saepe quas incidunt similique quia magni autem perferendis sint itaque, fuga, modi nostrum officiis aliquid, earum eius nobis accusantium distinctio doloribus odio.</p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className='text-xl text-white mt-10 text-center border-b-2 border-green-500 pb-2'>
        <p>WHY <span className='text-green-500'>CHOOSE US?</span></p>
      </div>

      {/* Features Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-6 text-gray-400'>
        {/* Efficiency */}
        <div className='border border-green-500 rounded-xl px-5 py-5 flex flex-col gap-2 bg-gray-900 hover:shadow-lg transition-all duration-300'>
          <p className='text-green-500 font-medium text-center border-b-2 border-white mb-2'>EFFICIENCY:</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora praesentium temporibus doloribus quisquam quia blanditiis.</p>
        </div>

        {/* Convenience */}
        <div className='border border-green-500 rounded-xl px-5 py-5 flex flex-col gap-2 bg-gray-900 hover:shadow-lg transition-all duration-300'>
          <p className='text-green-500 font-medium text-center border-b-2 border-white mb-2'>CONVENIENCE:</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. A enim iusto inventore maxime asperiores consectetur?</p>
        </div>

        {/* Proficiency */}
        <div className='border border-green-500 rounded-xl px-5 py-5 flex flex-col gap-2 bg-gray-900 hover:shadow-lg transition-all duration-300'>
          <p className='text-green-500 font-medium text-center border-b-2 border-white mb-2'>PROFICIENCY:</p>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quis officia quisquam quidem saepe non? Culpa.</p>
        </div>
      </div>
    </div>
  )
}

export default About
