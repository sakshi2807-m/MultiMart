import vendorModel from "../models/vendorModel.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"
import bookingModel from "../models/bookingModel.js"


const changeAvailability = async (req, res) => {
  try {

    const { vendorId } = req.body

    const vendorData = await vendorModel.findById(vendorId)
    await vendorModel.findByIdAndUpdate(vendorId, { available: !vendorData.available })
    res.json({ success: true, message: "Availability Changed" })

  } catch (error) {
    res.json({ success: false, message: error.message })
    console.log(error)
  }
}


const vendorList = async (req, res) => {
  try {
    const vendors = await vendorModel.find({}).select(['-password', '-email'])
    res.json({ success: true, vendors }) // <-- ✅ sending the data to frontend
  } catch (error) {
    res.json({ success: false, message: error.message })
    console.log(error)
  }
}


//api for  venodr login

const loginVendor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const vendor = await vendorModel.findOne({ email });

    if (!vendor) {
      return res.json({ success: false, message: "Invalid Credentials" });
    }

    const isMatch = await bcrypt.compare(password, vendor.password);
    if (isMatch) {
      const token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET);
      res.json({ success: true, token });
    } else {
      res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
    console.log(error);
  }
};


//api to to get vednor bookings

const bookingsVendor = async (req, res) => {
  try {
    const vendorId = req.vendorId; // ✅ Get it from the middleware

    if (!vendorId) {
      return res.status(400).json({ success: false, message: "Vendor ID not found" });
    }

    const bookings = await bookingModel.find({ vendorId });

    res.json({ success: true, bookings });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


///apit to mark booking completed 
const bookingComplete = async (req, res) => {
  try {

    const { vendorId, bookingId } = req.body
    const bookingData = bookingModel.findById(bookingId)
    if (bookingData && bookingData.vendorId === vendorId) {

      await bookingModel.findByIdAndUpdate(bookingId, { isCompleted: true })
      return res.json({ success: true, message: "Booking Completed" })

    } else {
      return res.json({ sucess: false, message: "Marked Failed" })
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}


///apit to booking cancel 
const bookingCancel = async (req, res) => {
  try {

    const { vendorId, bookingId } = req.body
    const bookingData = bookingModel.findById(bookingId)
    if (bookingData && bookingData.vendorId === vendorId) {

      await bookingModel.findByIdAndUpdate(bookingId, { cancelled: true })
      return res.json({ success: true, message: "Booking Cancelled" })

    } else {
      return res.json({ sucess: false, message: "Cancellation Failed" })
    }

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}



//api to get vendor dashboard data
const vednorDashboard = async (req, res) => {
  try {
    const vendorId = req.vendorId;

    const booking = await bookingModel.find({ vendorId });

    let earning = 0;
    let client = [];

    booking.forEach((item) => {
      if (item.isCompleted && item.payment) {
        earning += item.amount;
      }

      if (!client.includes(item.userId)) {
        client.push(item.userId);
      }
    });

    const dashData = {
      earning,
      booking: booking.length,
      client: client.length,
      latestBooking: booking.slice().reverse().slice(0, 5),
    };

    res.json({ success: true, dashData });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


// api to get vendor profile
const vendorProfile = async (req, res) => {
  try {

    const vendorId = req.vendorId;

    const profileData = await vendorModel.findById(vendorId).select('-password')

    res.json({ success: true, profileData })

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}


//apit to update vendor data frm vendor panel
const updateVendor = async (req, res) => {
  try {
    const vendorId = req.vendorId // <-- assuming auth middleware sets req.user

    const { fees, address, available, about, services } = req.body

    const updatedVendor = await vendorModel.findByIdAndUpdate(
      vendorId,
      { fees, address, available, about, services },
      { new: true }
    )

    if (!updatedVendor) {
      return res.status(404).json({ success: false, message: 'Vendor not found' })
    }

    res.json({ success: true, message: 'Profile updated successfully', vendor: updatedVendor })

  } catch (error) {
    console.log(error)
    res.json({ success: false, message: error.message })
  }
}



export { changeAvailability, vendorList, loginVendor, bookingsVendor, bookingComplete, bookingCancel, vednorDashboard, vendorProfile, updateVendor }