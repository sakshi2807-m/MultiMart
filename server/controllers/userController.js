import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary"
import vednorModel from '../models/vendorModel.js'

import bookingModel from "../models/bookingModel.js";
import vendorModel from "../models/vendorModel.js";
import razorpay from "razorpay"

import dotenv from "dotenv"
dotenv.config()




const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Missing required fields!" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email address!" });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters!" });
    }

    // Check if email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Email already registered!" });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // Generate JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};




const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User does not exist",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d", // optional, good for control
      });
      return res.json({
        success: true,
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,

        },
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};



const getProfile = async (req, res) => {
  try {
    const userId = req.userId; // ✅ Corrected: from auth middleware

    const userData = await userModel.findById(userId).select('-password');

    res.json({
      success: true,
      userData
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    // Prefer secure userId from middleware over body input
    const userId = req.userId || req.body.userId;

    if (!userId) {
      return res.status(401).json({ success: false, message: "User not authorized!" });
    }

    const { name, phone, address, gender } = req.body;
    const imageFile = req.file;

    if (!name || !phone || !gender) {
      return res.json({ success: false, message: "Required fields missing!" });
    }

    // Optional: Parse address safely
    let parsedAddress = {};
    try {
      parsedAddress = address ? JSON.parse(address) : {};
    } catch (err) {
      return res.json({ success: false, message: "Invalid address format!" });
    }

    // Prepare update fields
    const updateFields = {
      name,
      phone,
      gender,
      address: parsedAddress,
    };

    // If image uploaded, upload to cloudinary
    if (imageFile) {
      const uploadImg = await cloudinary.uploader.upload(imageFile.path, {
        resource_type: "image",
        folder: "user_profiles", // optional: organize in a folder
      });

      if (uploadImg?.secure_url) {
        updateFields.image = uploadImg.secure_url;
      }
    }

    const updatedUser = await userModel.findByIdAndUpdate(userId, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      message: "Profile updated successfully",
      updatedUser,
    });

  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ success: false, message: error.message || "Server error" });
  }
};


//api to book bookings

const bookings = async (req, res) => {
  try {
    const { userId, vendorId, slotDate, slotTime } = req.body;

    const vendorData = await vednorModel.findById(vendorId).select('-password');

    if (!vendorData.available) {
      return res.json({ success: true, message: "Vendor Not Available" });
    }

    // Clone slots_booked safely
    let slots_booked = { ...vendorData.slots_booked };

    // Check for slot availability
    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        return res.json({ success: true, message: "Slot Not Available" });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [slotTime];
    }

    const userData = await userModel.findById(userId).select('-password');

    // Optional: Avoid saving full slots_booked in booking
    const vendorDataForBooking = vendorData.toObject();
    delete vendorDataForBooking.slots_booked;

    const bookingData = {
      userId,
      vendorId,
      userData,
      vendorData: vendorDataForBooking,
      amount: vendorData.fees,
      slotTime,
      slotDate,
      date: Date.now()
    };

    const newBooking = new bookingModel(bookingData);
    await newBooking.save();

    // ✅ Save updated slot info
    await vednorModel.findByIdAndUpdate(vendorId, {
      $set: { [`slots_booked.${slotDate}`]: slots_booked[slotDate] }
    });

    res.json({ success: true, message: "Booking Done" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


///api to get user bookings on my bookings 
const listBookings = async (req, res) => {
  try {
    // Use req.userId which was set by the auth middleware
    const bookings = await bookingModel.find({ userId: req.userId });

    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//api to cancle booking
const cancleBooking = async (req, res) => {
  try {
    const { userId, bookingId } = req.body;

    const bookingData = await bookingModel.findById(bookingId);

    if (!bookingData) {
      return res.json({ success: false, message: "Booking not found" });
    }

    // Verify booking belongs to the user
    if (bookingData.userId.toString() !== userId) {  // Compare as strings to avoid object mismatch
      return res.json({ success: false, message: "Unauthorized action" });
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




const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const paymentRazorpay = async (req, res) => {
  try {
    

    const { bookingId } = req.body;
    const bookingData = await bookingModel.findById(bookingId);

    if (!bookingData) {
      return res.status(404).json({ success: false, message: "Booking not found!" });
    }

    if (bookingData.cancelled) {
      return res.status(400).json({ success: false, message: "Booking has been cancelled!" });
    }

    console.log("Booking data found:", bookingData);

    const options = {
      amount: bookingData.amount * 100,
      currency: process.env.CURRENCY || "INR",
      receipt: bookingId,
    };

    console.log("Creating order with options:", options);

    const order = await razorpayInstance.orders.create(options);
    console.log("Order created:", order);

    res.json({ success: true, order });

  } catch (error) {
    console.error("Error in paymentRazorpay:", JSON.stringify(error, null, 2));
    res.status(500).json({ success: false, message: "Razorpay Order Error", error });
  }
  
};



//api t o verify payment of razorpay
const verifyRazorpay = async (req, res) => {
  try {
    const { response } = req.body;
    const { razorpay_order_id } = response;

    if (!razorpay_order_id) {
      return res.status(400).json({ success: false, message: "Missing razorpay_order_id" });
    }

    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    console.log("Fetched order info:", orderInfo);

    if (orderInfo.status === 'paid') {
      await bookingModel.findByIdAndUpdate(orderInfo.receipt, { payment: true });
      res.json({ success: true, message: 'Payment Successful' });
    } else {
      res.json({ success: false, message: 'Payment Failed' });
    }

  } catch (error) {
    console.error("Error in verifyRazorpay:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
 




export { updateProfile, registerUser, loginUser, getProfile, bookings, listBookings, cancleBooking, paymentRazorpay,verifyRazorpay }
