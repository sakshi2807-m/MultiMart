import React, { useContext } from 'react'
import Login from './pages/Login'


import { ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './compo/Navbar';
import SideBar from './compo/SideBar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllBookings from './pages/Admin/AllBookings';
import AddVendor from './pages/Admin/AddVendor';
import VendorsList from './pages/Admin/VendorsList';
import { VendorContext } from './context/VendorContext';
import VendorDashboard from "./pages/Vendor/VendorDashboard"
import VendorBookings from './pages/Vendor/vendorBookings';
import VendorProfile from './pages/Vendor/vendorProfile';
const App = () => {

  const {aToken} = useContext(AdminContext)
  const {vToken} =useContext(VendorContext)

  return  aToken || vToken ? (
    <div className=''>  
      <ToastContainer position="top-right"/>
      <Navbar/>
      <div className='flex items-start'>
        <SideBar/>
        <Routes>
          {/* admin routes */}
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard/>} />
          <Route path='/all-bookings' element={<AllBookings/>} />
          <Route path='/add-vendor' element={<AddVendor/>} />
          <Route path='/vendor-list' element={<VendorsList/>} />
         
         {/* vendor route */}
          <Route path='/vendor-dashboard' element={<VendorDashboard/>} />
          <Route path='/vendor-bookings' element={<VendorBookings/>} />
          <Route path='/vendor-profile' element={<VendorProfile/>} />

        </Routes>
      </div>
    </div>
  ) :
  <>
  <Login/>
  <ToastContainer position="top-right"/>
  </>
}

export default App