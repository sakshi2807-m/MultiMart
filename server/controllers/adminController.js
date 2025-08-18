
import validator from "validator"
import vendorModel from "../models/vendorModel.js"
import bcrypt from "bcrypt"
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken"
import bookingModel from "../models/bookingModel.js";
import userModel from "../models/userModel.js";



const addVendor = async (req, res) => {
  try {
    const {
      name, email, shopName, password, category,
      aadharNo, gstNo, urnNo, about,
      services, fees, address
    } = req.body;

    const imageFile = req.file;

    console.log("BODY:", req.body);
    console.log("FILE:", req.file);

    if (
      !name || !email || !shopName || !password || !category || !aadharNo || !gstNo || !urnNo ||
      !about || !services || !fees || !address || !imageFile
    ) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email." });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters long." });
    }

    // Check if email already exists
    const existingVendor = await vendorModel.findOne({ email });
    if (existingVendor) {
      return res.status(409).json({ success: false, message: "A vendor with this email already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    let parsedAddress;
    try {
      parsedAddress = JSON.parse(address);
    } catch {
      return res.status(400).json({ success: false, message: "Invalid address format" });
    }

    let parsedServices;
    try {
      parsedServices = JSON.parse(services);
    } catch {
      return res.status(400).json({ success: false, message: "Invalid services format" });
    }

    let imageUrl = "";
    try {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
      });
      imageUrl = imageUpload.secure_url;
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Image upload failed",
        error: err.message,
      });
    }

    const vendorData = {
      name,
      email,
      shopName,
      image: imageUrl,
      password: hashedPassword,
      category,
      aadharNo,
      gstNo,
      urnNo,
      about,
      services: parsedServices,
      fees,
      address: parsedAddress,
      available: true,
      date: Date.now(),
    };

    const newVendor = new vendorModel(vendorData);
    await newVendor.save();

    res.status(200).json({ success: true, message: "Vendor added successfully" });
  } catch (error) {
    console.error("Add vendor error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};



//api for the admin login
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      return res.json({
        success: true,
        token
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Invalid admin credentials"
      });
    }

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}


//api to get all vendors pannel
const allVendors = async (req,res)=>{
  try {
    
    const vendors = await vendorModel.find({}).select('-password')
    res.json({success:true, vendors})
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}



//api to get all bokings
const bookingAdmin =async(req,res) =>{
  try {

    const bookings = await bookingModel.find({})
    res.json({success:true, bookings})

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
}

//cancle boookng through admin bookings 
const cancleBooking = async (req, res) => {
  try {
    const {  bookingId } = req.body;

    const bookingData = await bookingModel.findById(bookingId);

    if (!bookingData) {
      return res.json({ success: false, message: "Booking not found" });
    }

 

    await bookingModel.findByIdAndUpdate(bookingId, { cancelled: true });

    // Releasing vendor slot
    const { vendorId, slotDate, slotTime } = bookingData;

    const vendorData = await vendorModel.findById(vendorId);
    let slots_booked = vendorData.slots_booked || {};

    if (slots_booked[slotDate]) {
      slots_booked[slotDate] = slots_booked[slotDate].filter(e => e !== slotTime);
    }

    await vendorModel.findByIdAndUpdate(vendorId, { slots_booked });

    res.json({ success: true, message: "Booking Cancelled" });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};


//api for admin dashboard data
const adminDashboard =async (req,res)=>{
try {

  const vendor = await vendorModel.find({})

  const user =await userModel.find({})

  const booking = await bookingModel.find({})

  const dashData={
    vendor: vendor.length,
    user: user.length,
    booking: booking.length,
    latestBooking:booking.reverse().slice(0,5)
  }

  res.json({success:true, dashData})
  
} catch (error) {
  console.error(error);
  res.json({ success: false, message: error.message });
}
}




export {addVendor,loginAdmin, allVendors,bookingAdmin,cancleBooking, adminDashboard}