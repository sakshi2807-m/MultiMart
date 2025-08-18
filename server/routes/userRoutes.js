import express from 'express'


import { bookings, cancleBooking, getProfile, listBookings, loginUser, paymentRazorpay, registerUser, updateProfile, verifyRazorpay } from '../controllers/userController.js'
import authUser from '../middlewares/authUser.js'
import upload from '../middlewares/multer.js'


const userRouter= express.Router()


userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.get('/get-profile',authUser, getProfile)
userRouter.put('/update-user',upload.single('image'),authUser, updateProfile)
userRouter.post('/book-vendor',authUser, bookings)
userRouter.get('/bookings',authUser, listBookings)
userRouter.post('/cancel-booking',authUser, cancleBooking)
userRouter.post('/payment-razorpay',authUser, paymentRazorpay)
userRouter.put('/verify-razorpay',authUser, verifyRazorpay)

export default userRouter


