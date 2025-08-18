import React, { useContext, useState } from 'react';
import image from "../../assets/upload_area.svg";
import { AdminContext } from '../../context/AdminContext';
import {toast} from "react-toastify"
import axios from 'axios'


const AddVendor = () => {

  const [vendorImage, setVendorImage] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [shopName, setShopName] = useState('')
  const [category, setCategory] = useState('Technology')
  const [fees, setFees] = useState('')
  const [aadhar, setAadhar] = useState('')
  const [gst, setGst] = useState('')
  const [urn, setUrn] = useState('')
  const [about, setAbout] = useState('')
  const [address1, setAddress1] = useState('')
  const [address2, setAddress2] = useState('')
  const [service, setService] = useState('')


  const {backendUrl, aToken} = useContext(AdminContext)



  const onSubmitHandler = async (e) => {
    e.preventDefault();
  
    try {
      if (!vendorImage) {
        return toast.error("Image not selected");
      }
  
      const formData = new FormData();
      formData.append("image", vendorImage);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("shopName", shopName);
      formData.append("password", password);
      formData.append("category", category);
      formData.append("fees", Number(fees));
      formData.append("aadharNo", aadhar);
      formData.append("gstNo", gst);
      formData.append("urnNo", urn);
      formData.append("services", JSON.stringify([{ name: service || "Service", price: Number(fees) || 100 }]));
      formData.append("address", JSON.stringify({ line1: address1, line2: address2 }));
      formData.append("about", about);
  
      const response = await axios.post(backendUrl + "/api/admin/add-vendor", formData, {
        headers: { aToken },
      });
  
      const data = response.data;
  
      if (data.success) {
        toast.success(data.message);
        // Reset form
        setVendorImage("");
        setName("");
        setEmail("");
        setAadhar("");
        setUrn("");
        setAbout("");
        setService("");
        setFees("");
        setGst("");
        setPassword("");
        setShopName("");
        setAddress1("");
        setAddress2("");
      } else {
        toast.error(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error adding vendor:", error);
      // Handle both .response and generic error
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Server error. Try again later.");
      }
    }
  };
  


  return (
    <form onSubmit={onSubmitHandler} className="max-w-4xl mx-3 p-4 sm:p-6 bg-gray-800 text-white rounded-2xl shadow-xl mt-2 ml-2">
      <p className="text-2xl font-bold text-green-400 mb-6 text-center">Add Vendor</p>

      <div className="flex flex-col md:flex-col md:items-start gap-6 md:gap-8">
        {/* Upload Section */}
        <div className="flex flex-col items-center gap-2 w-full md:w-1/3">
          <label htmlFor="vendorImage" className="cursor-pointer hover:scale-105 transition-transform">
            <img src={vendorImage ? URL.createObjectURL(vendorImage) : image} alt="Upload Area" className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 object-contain" />
          </label>
          <input onChange={(e) => setVendorImage(e.target.files[0])} type="file" id="vendorImage" hidden />
          <p className="text-sm text-gray-400 text-center">Upload Vendor <br /> Picture</p>
        </div>

        {/* Input Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
          <div>
            <p className="mb-1 text-sm">Vendor Name</p>
            <input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="Name" required className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none transition" />
          </div>
          <div>
            <p className="mb-1 text-sm">Vendor Shop Title</p>
            <input onChange={(e) => setShopName(e.target.value)} value={shopName} type="text" placeholder="Name" required className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none transition" />
          </div>

          <div>
            <p className="mb-1 text-sm">Vendor Email</p>
            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" required className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none transition" />
          </div>

          <div>
            <p className="mb-1 text-sm">Vendor Password</p>
            <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" required className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none transition" />
          </div>

          <div>
            <p className="mb-1 text-sm">Vendor Aadhar</p>
            <input onChange={(e) => setAadhar(e.target.value)} value={aadhar} type="text" placeholder="Aadhar No" required className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none transition" />
          </div>

          <div>
            <p className="mb-1 text-sm">Vendor GST</p>
            <input onChange={(e) => setGst(e.target.value)} value={gst} type="text" placeholder="GST No" required className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none transition" />
          </div>

          <div>
            <p className="mb-1 text-sm">Vendor URN</p>
            <input onChange={(e) => setUrn(e.target.value)} value={urn} type="text" placeholder="URN No" required className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none transition" />
          </div>

          <div>
            <p className="mb-1 text-sm">Vendor Category</p>
            <select onChange={(e) => setCategory(e.target.value)} value={category} required className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white focus:ring-2 focus:ring-green-500 focus:outline-none transition">
              <option value="">Select Category</option>
              <option value="Electrician">Electrician</option>
              <option value="Home Services">Home Services</option>
              <option value="Technology">Technology</option>
              <option value="Plumbing">Plumbing</option>
              <option value="Health">Health</option>
              <option value="Painter">Painter</option>
              <option value="Carpainter">Carpainter</option>
              <option value="Cloth">Cloth</option>
              <option value="Groceries">Groceries</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
  <p className="mb-1 text-sm">Vendor Service</p>
  <input
    onChange={(e) => setService(e.target.value)}
    value={service}
    type="text"
    placeholder="Services"
    required
    className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
  />
</div>


          <div>
            <p className="mb-1 text-sm">Vendor Booking Fees</p>
            <input onChange={(e) => setFees(e.target.value)} value={fees} type="number" placeholder="Booking Fees" required className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none transition" />
          </div>

          <div>
            <p className="mb-1 text-sm">Address</p>
            <input onChange={(e) => setAddress1(e.target.value)} value={address1} type="text" placeholder="Address 1" required className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none transition" />
            <input onChange={(e) => setAddress2(e.target.value)} value={address2} type="text" placeholder="Address 2" required className="w-full mt-3 px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none transition" />
          </div>
        </div>

        {/* Full-width Textarea */}
        <div className="w-full">
          <p className="mb-1 text-sm">About The Vendor service</p>
          <textarea

            onChange={(e) => setAbout(e.target.value)} value={about}
            rows={4}
            placeholder="Write about the vendor services"
            required
            className="w-full px-3 py-2 rounded-lg bg-gray-700 border border-gray-600 focus:ring-2 focus:ring-green-500 focus:outline-none transition"
          />
        </div>
        <button
          type="submit"
          className="mt-6 w-full sm:w-auto px-6 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-md transition duration-300 ease-in-out"
        >
          Add Vendor
        </button>
      </div>
    </form>
  );
};

export default AddVendor;
