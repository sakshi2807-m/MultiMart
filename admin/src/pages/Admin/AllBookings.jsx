import React from 'react'
import { useContext } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/Appcontext'
import { GiCancel } from "react-icons/gi";
const AllBookings = () => {

  const {aToken, bookings, getAllBookings,cancelBooking} =useContext(AdminContext)
  const {slotDateFormate,currency} =useContext(AppContext)
  useEffect(()=>{
    if(aToken){
      getAllBookings()
    }
  },[aToken])

  return (
    <div className=' w-full max-w-6xl m-5'>
        <p className='mb-3 text-lg font-medium'>All Bookings</p>
        <div className=' border border-green-500 text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>

          <div className='hidden sm:grid frid:cols-[0.5fr_2lfr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b border-green-500 '>
              <p>#</p>
              <p>user</p>
              <p>Date & Time</p>
              <p>Vendor</p>
              <p>Booking Fees</p>
              <p>Actions</p>
            
          </div>

            {bookings.map((item,index)=>{
                return (
              <div key={index} className='felx flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr]  items-center text-gray-400 py-3 px-6 border-b-green-500 hover:bg-gray-700'>
                  <p className='max-sm:hidden'>{index+1}</p>
                  <div className='flex items-center gap-2'>
                    <img src={item.userData.image} alt="" className='w-8 rounded-full'/> 
                    <p>{item.userData.name}</p>
                    
                  </div>
                  <p>{slotDateFormate(item.slotDate)},{item.slotTime}</p>

                  <div className='flex items-center gap-2'>
                    <img src={item.vendorData.image} alt="" className='w-8 rounded-full'/> 
                    <p>{item.vendorData.name}</p>
                    
                  </div>
                  <p>{currency} {item.amount}</p>
                  {item.cancelled
                  ? <p className='text-red-400'>Cancelled</p>
                : item.isCompleted ? <p>Completed</p> : 
                  <p onClick={()=>cancelBooking(item._id)} className='text-red-400'><GiCancel/></p>
                }
              </div>
                )
            })}
                
        </div>
    </div>
  )
}

export default AllBookings