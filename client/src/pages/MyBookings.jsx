import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import {useNavigate} from "react-router-dom"



const MyBookings = () => {
  const { backendUrl, token, userData,getAllVendorsData } = useContext(AppContext)
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])

  const months =[" ", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]

  const slotDateFormate = (slotDate) => {
    const dateArray = slotDate.split("_")
    return `${dateArray[0]} ${months[Number(dateArray[1])]} ${dateArray[2]}`
  }

  const getBookings = async () => {
    try {
      const { data } = await axios.get(backendUrl + '/api/user/bookings', { headers: { token } })

      if (data.success) {
        setBookings(data.bookings.reverse())
        console.log(data);
        
      } else {
        toast.error('Failed to fetch bookings.')
      }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const cancelBooking = async (bookingId) => {
    try {
      const userId = userData._id;  // Assuming _id is the userId in the userData object
  
      const { data } = await axios.post(
        backendUrl + '/api/user/cancel-booking',
        { bookingId, userId },  // Send userId along with bookingId
        { headers: { token } }
      );
  
      if (data.success) {
        toast.success(data.message);
        getBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };


  const initPay=(order) =>{
    const options = {
      key:import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name:"Booking Payment",
      discription:"Booking Payment",
      order_id:order.id,
      receipt:order.receipt,
      handler:async(response)=>{
        console.log(response);
        
        try {
          const{data} = await axios.put(backendUrl +'/api/user/verify-razorpay',{response}, {headers:{token}})

          if(data.success){
            getBookings()
            navigate('/my-bookings')
          }
        

        } catch (error) {
          console.log(error);
          toast.error(error.message)
          
        }
      }
    }
      const rzp =new window.Razorpay(options)
      rzp.open()
  }

  const bookingRazorpay = async (bookingId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { bookingId },
        { headers: { token } }
      );
  
      if (data.success) {
        initPay(data.order)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  







  useEffect(() => {
    if (token) {
      getBookings()
      getAllVendorsData()
    }
  }, [token])

  return (
    <div className="text-white p-6 md:p-12">
      <p className="pb-3 mt-12 font-semibold text-green-400 text-2xl border-b border-green-500">
        My Bookings
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {bookings.map((item, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-xl shadow-md p-4 flex flex-col md:flex-row gap-4 hover:shadow-lg transition-shadow duration-300"
          >
            {/* Image */}
            <div className="flex-shrink-0">
              <img
                src={item.vendorData.image}
                alt={item.vendorData.vendorName}
                className="w-32 h-32 object-cover rounded-md border border-white"
              />
            </div>

            {/* Booking Details */}
            <div className="flex-1 space-y-1">
              <p className="text-xl font-bold text-green-300">{item.vendorData.name}</p>
              <p className="text-sm text-gray-300">{item.vendorData.category}</p>

              <div className="mt-2 text-sm">
                <p className="font-semibold text-white">Address:</p>
                <p className="text-gray-400">{item.vendorData.address?.line1 || 'No address available'}</p>
                <p className="text-gray-400">{item.vendorData.address?.line2 || 'No address available'}</p>
              </div>

              <p className="text-sm text-gray-400 mt-2">
                <span className="font-semibold text-white">Date & Time:</span>{' '}
                {slotDateFormate(item.slotDate)} | {item.slotTime}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col justify-center items-start md:items-end gap-2 mt-4 md:mt-0">
              {!item.cancelled && item.payment && !item.isCompleted && <button className='"bg-gray-600 text-green-400 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 cursor-not-allowed'> Paid </button>}
              
              {!item.cancelled && !item.payment && !item.isCompleted && <button onClick={()=>bookingRazorpay(item._id)} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300">
                Pay Online
              </button>}
              {!item.cancelled && !item.isCompleted && <button onClick={() => cancelBooking(item._id)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-all duration-300">
                Cancel Booking
              </button>}

              {item.cancelled && !item.isCompleted && (
                <button className="bg-gray-600 text-red-400 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 cursor-not-allowed">
                  Booking Cancelled
                </button>
              )}

              {
                item.isCompleted && <button  className="bg-gray-600 text-green-400 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 cursor-not-allowed">Completed</button>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyBookings;
