import React, { useContext, useEffect } from 'react';
import { VendorContext } from '../../context/VendorContext';
import { AppContext } from '../../context/Appcontext';
import { GiCancel } from "react-icons/gi";
import { FaCheckCircle } from "react-icons/fa";

const VendorBookings = () => {
  const { vToken, bookings, getBookings, cancelBooking, completeBooking } = useContext(VendorContext);
  const { slotDateFormate, currency } = useContext(AppContext);

  useEffect(() => {
    if (vToken) {
      getBookings();
    }
  }, [vToken]);

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Bookings</p>

      <div className='border border-green-500 text-sm max-h-[80vh] min-h-[60vh] overflow-y-auto overflow-x-auto'>
        {/* Table Header */}
        <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_1fr_1fr_1.5fr] py-3 px-6 border-b border-green-500 text-white bg-green-700 sticky top-0 z-10'>
          <p>#</p>
          <p>User</p>
          <p>Payment</p>
          <p>Date & Time</p>
          <p>Amount</p>
          <p>Status</p>
          <p>Action</p>
        </div>

        {/* Table Body */}
        {bookings.map((item, index) => (
          <div
            key={item._id}
            className='grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr_2fr_1fr_1fr_1.5fr] items-center gap-2 text-gray-300 py-3 px-6 border-b border-green-500 hover:bg-gray-800 min-w-[600px]'
          >
            <p className='sm:block hidden'>{index + 1}</p>

            <div className='flex items-center gap-2'>
              <img src={item.userData?.image} alt="user" className='w-8 h-8 rounded-full object-cover' />
              <p>{item.userData?.name}</p>
            </div>

            <p>{item.payment
 ? "Online" : "Cash"}</p>

            <p>{slotDateFormate(item.slotDate)}, {item.slotTime}</p>
            <p>{currency} {item.amount}</p>

            <p className={item.cancelled ? 'text-red-400' : 'text-green-400'}>
              {item.cancelled ? 'Cancelled' : 'Confirmed'}
            </p>

            {item.cancelled ? (
              <p className='text-red-400'>Cancelled</p>
            ) : item.isCompleted ? (
              <p className='text-green-400'>Completed</p>
            ) : (
              <div className='flex gap-3'>
                <button onClick={() => cancelBooking(item._id)} className='text-red-400 text-lg'><GiCancel /></button>
                <button onClick={() => completeBooking(item._id)} className='text-green-400 text-lg'><FaCheckCircle /></button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorBookings;
