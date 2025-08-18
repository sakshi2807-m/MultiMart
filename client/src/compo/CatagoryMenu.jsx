import React from 'react'
import { category } from '../assets/assets.js'
import { Link } from 'react-router-dom'
const CatagoryMenu = () => {
  return (
    <div id='category' className='text-white  flex flex-col items-center gap-4
    py-16' >

        <h1 className='text-green-500 text-2xl font-semibold'>Find By Categories</h1>
        <p className='text-sm'>Simply find through extensive list of trusted vendors, schedule your bookings hassle-free.</p>
        <div className=' flex sm:justify-center gap-10 pt-5 w-full overflow-scroll '>
          {category.map((item, index)=>(
              <Link onClick={()=>scrollTo(0,0)} className='flex flex-col items-center justify-center cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' key={index} to={`/vendors/${item.category}`}>
              <img src={item.image} alt="" className='w-18 rounded-full border border-white px-3 py-2
              sm:w-18  mb-2 hover:scale-105 transition-all ease-in-out duration-300 ' />
              <p className='text-xs text-white/80'>{item.category}</p>
              </Link>
          )
          )}
        </div>
    </div>
  )
}

export default CatagoryMenu