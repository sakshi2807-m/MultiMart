import React, { useContext, useEffect } from 'react'
import { VendorContext } from '../../context/VendorContext'
import { FaShoppingBag } from "react-icons/fa"
import { RiUserStarFill } from "react-icons/ri"
import { FaIndianRupeeSign } from "react-icons/fa6";
import { AppContext } from '../../context/Appcontext'
import { FaClipboardList } from "react-icons/fa6"
import { GiCancel } from "react-icons/gi"
import { FaCheckCircle } from "react-icons/fa";

const vendorDashboard = () => {

  const { dashData, vToken, setDashData, getDashData ,cancelBooking,completeBooking} = useContext(VendorContext)
  const { currency, slotDateFormate } = useContext(AppContext)

  useEffect(() => {
    if (vToken) {
      getDashData()
    }
  }, [vToken])

  return dashData && (
    <div className="w-full min-h-screen p-6 text-white bg-gray-900">

      <h2 className="text-3xl font-bold mb-6">Vendor Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        <div className="flex items-center gap-4 p-5 bg-gray-800 rounded-2xl shadow-lg hover:scale-105 transition-transform">
          <FaShoppingBag size={40} className="text-green-300" />
          <div>
            <p className="text-2xl font-bold">{dashData.booking}</p>
            <p className="text-gray-400">Bookings</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-5 bg-gray-800 rounded-2xl shadow-lg hover:scale-105 transition-transform">
          <RiUserStarFill size={40} className="text-blue-300" />
          <div>
            <p className="text-2xl font-bold">{dashData.client}</p>
            <p className="text-gray-400">Clients</p>
          </div>
        </div>

        <div className="flex items-center gap-4 p-5 bg-gray-800 rounded-2xl shadow-lg hover:scale-105 transition-transform">
          <FaIndianRupeeSign size={40} className="text-purple-300" />
          <div>
            <p className="text-2xl font-bold">{currency}{dashData.earning}</p>
            <p className="text-gray-400">Earnings</p>
          </div>
        </div>
      </div>

      {/* Latest Bookings */}
      <div className="bg-gray-800 rounded-2xl p-5 shadow-md w-full">
        <div className="flex items-center gap-3 mb-4 border-b border-gray-700 pb-3">
          <FaClipboardList className="text-yellow-300" size={24} />
          <h3 className="text-xl font-semibold">Latest Bookings</h3>
        </div>

        <div className="max-h-[300px] overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
          {dashData.latestBooking.map((item, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-700 p-4 rounded-lg shadow">
              <div className="flex items-center gap-4">
                <img
                  src={item.userData.image}
                  alt={item.userData.name}
                  className="w-12 h-12 rounded-full object-cover border border-gray-600"
                />
                <div>
                  <p className="font-semibold">{item.userData.name}</p>
                  <p className="text-sm text-gray-300">{slotDateFormate(item.slotDate)} | {item.slotTime}</p>
                </div>
              </div>
              <div>
                {item.cancelled ? (
                  <p className='text-red-400 font-semibold'>Cancelled</p>
                ) : item.isCompleted ? (
                  <p className='text-green-400 font-semibold'>Completed</p>
                ) : (
                  <div className='flex gap-3'>
                    <button onClick={() => cancelBooking(item._id)} className='text-red-400 text-lg'>
                      <GiCancel />
                    </button>
                    <button onClick={() => completeBooking(item._id)} className='text-green-400 text-lg'>
                      <FaCheckCircle />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default vendorDashboard
