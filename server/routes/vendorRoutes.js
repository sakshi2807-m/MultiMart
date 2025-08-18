import express, { Router } from 'express'
import { bookingCancel, bookingComplete, bookingsVendor, loginVendor, updateVendor, vednorDashboard, vendorList, vendorProfile } from '../controllers/vendorController.js'
import vendorAuth from '../middlewares/vendorAuth.js'


const vendorRouter=express.Router()


vendorRouter.get('/list',vendorList)
vendorRouter.post('/login',loginVendor)
vendorRouter.get('/bookings',vendorAuth,bookingsVendor)
vendorRouter.post('/complete-booking',vendorAuth,bookingComplete)
vendorRouter.post('/booking-cancel',vendorAuth,bookingCancel)
vendorRouter.get('/dashboard',vendorAuth,vednorDashboard)
vendorRouter.get('/profile',vendorAuth,vendorProfile)
vendorRouter.post('/update-profile',vendorAuth,updateVendor)


export  default vendorRouter