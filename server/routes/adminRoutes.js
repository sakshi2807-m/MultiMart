import express from "express";
import { addVendor,
    adminDashboard,
    allVendors,
    bookingAdmin,
    cancleBooking,
    loginAdmin 

} 
from "../controllers/adminController.js";
import upload from "../middlewares/multer.js";
import authAdmin  from "../middlewares/authAdmin.js";
import { changeAvailability } from "../controllers/vendorController.js";

const adminRouter= express.Router()

adminRouter.post('/add-vendor',authAdmin,upload.single('image'),addVendor)
adminRouter.post('/admin-login', loginAdmin)
adminRouter.post('/all-vendors',authAdmin, allVendors)
adminRouter.post('/change-availability',authAdmin, changeAvailability)
adminRouter.get('/bookings',authAdmin, bookingAdmin)
adminRouter.post('/cancle-booking',authAdmin, cancleBooking)
adminRouter.get('/dashboard',authAdmin, adminDashboard)


export default adminRouter
