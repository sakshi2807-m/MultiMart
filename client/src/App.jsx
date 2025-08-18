
import React from 'react'
import {Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Vendors from './pages/Vendors'
import Login from './pages/Login'
import About from './pages/About'
import MyProfile from './pages/MyProfile'
import MyBookings from './pages/MyBookings'
import Contact from './pages/Contact'
import Bookings from './pages/Bookings'
import Navbar from './compo/Navbar'
import Footer from './compo/Footer'

import { ToastContainer ,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 




const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]' >
      

      <ToastContainer/>

      <Navbar/>
      <Routes>

      <Route path='/' element={<Home/>}/>
      <Route path='/vendors' element={<Vendors/>}/>
      <Route path='/vendors/:category' element={<Vendors/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/my-profile' element={<MyProfile/>}/>
      <Route path='/my-bookings' element={<MyBookings/>}/>
      <Route path='/bookings/:vendorId' element={<Bookings/>}/>

      </Routes>
      <Footer/>
    </div>
  )
}

export default App