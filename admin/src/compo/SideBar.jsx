import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'

import { TbHomeFilled } from "react-icons/tb";
import { TbBrandBooking } from "react-icons/tb";
import { FaPlusSquare } from "react-icons/fa";
import { FaUsersGear } from "react-icons/fa6";
import { VendorContext } from '../context/VendorContext';

const SideBar = () => {
  const { aToken } = useContext(AdminContext);
  const { vToken } = useContext(VendorContext);

  return (
    <div className="w-16 md:w-64 mt-2 rounded-xl h-screen bg-gray-800 text-white p-2 md:p-6 shadow-lg transition-all">
      {aToken && (
        <ul className="flex flex-col gap-4">
          <NavLink to="/admin-dashboard" className={({ isActive }) =>
            `flex items-center md:gap-3 justify-center md:justify-start p-3 rounded-lg hover:bg-gray-700 transition-all ${
              isActive ? 'bg-green-500 text-white' : 'text-gray-300'
            }`
          }>
            <TbHomeFilled className="text-xl" />
            <p className="text-sm font-medium hidden md:block">Dashboard</p>
          </NavLink>

          <NavLink to="/all-bookings" className={({ isActive }) =>
            `flex items-center md:gap-3 justify-center md:justify-start p-3 rounded-lg hover:bg-gray-700 transition-all ${
              isActive ? 'bg-green-500 text-white' : 'text-gray-300'
            }`
          }>
            <TbBrandBooking className="text-xl" />
            <p className="text-sm font-medium hidden md:block">Bookings</p>
          </NavLink>

          <NavLink to="/add-vendor" className={({ isActive }) =>
            `flex items-center md:gap-3 justify-center md:justify-start p-3 rounded-lg hover:bg-gray-700 transition-all ${
              isActive ? 'bg-green-500 text-white' : 'text-gray-300'
            }`
          }>
            <FaPlusSquare className="text-xl" />
            <p className="text-sm font-medium hidden md:block">Add Vendor</p>
          </NavLink>

          <NavLink to="/vendor-list" className={({ isActive }) =>
            `flex items-center md:gap-3 justify-center md:justify-start p-3 rounded-lg hover:bg-gray-700 transition-all ${
              isActive ? 'bg-green-500 text-white' : 'text-gray-300'
            }`
          }>
            <FaUsersGear className="text-xl" />
            <p className="text-sm font-medium hidden md:block">Vendor List</p>
          </NavLink>
        </ul>
      )}

      {vToken && (
        <ul className="flex flex-col gap-4">
          <NavLink to="/vendor-dashboard" className={({ isActive }) =>
            `flex items-center md:gap-3 justify-center md:justify-start p-3 rounded-lg hover:bg-gray-700 transition-all ${
              isActive ? 'bg-green-500 text-white' : 'text-gray-300'
            }`
          }>
            <TbHomeFilled className="text-xl" />
            <p className="text-sm font-medium hidden md:block">Dashboard</p>
          </NavLink>

          <NavLink to="/vendor-bookings" className={({ isActive }) =>
            `flex items-center md:gap-3 justify-center md:justify-start p-3 rounded-lg hover:bg-gray-700 transition-all ${
              isActive ? 'bg-green-500 text-white' : 'text-gray-300'
            }`
          }>
            <TbBrandBooking className="text-xl" />
            <p className="text-sm font-medium hidden md:block">Bookings</p>
          </NavLink>

          <NavLink to="/vendor-profile" className={({ isActive }) =>
            `flex items-center md:gap-3 justify-center md:justify-start p-3 rounded-lg hover:bg-gray-700 transition-all ${
              isActive ? 'bg-green-500 text-white' : 'text-gray-300'
            }`
          }>
            <FaUsersGear className="text-xl" />
            <p className="text-sm font-medium hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>
  )
}

export default SideBar
