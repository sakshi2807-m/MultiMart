import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email:{type: String, required: true ,unique:true},
    password: { type: String, required: true },
    shopName:{type:String, required:true},
    image: { type: String, required: true },
    category: { type: String, required: true },
    aadharNo: { type: String, required: true },
    gstNo: { type: String, required: true },
    urnNo: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, required: true },
    services: [
      {
        name: String,
        description: String,
        price: Number,
      }
    ]
    
      ,
    fees: { type: Number, required: true },
    address: { type: Object, required: true },
    date: { type: Number, required: true },
    slots_booked: { type: Object, default: {} }
}, { minimize: false });

const vendorModel = mongoose.models.vendor || mongoose.model("vendor", vendorSchema);
export default vendorModel;
