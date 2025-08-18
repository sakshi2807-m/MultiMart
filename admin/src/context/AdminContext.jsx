import { createContext, useState } from "react";
import axios from "axios"
import { toast } from "react-toastify"




export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [vendors, setVendors] = useState([])
  const[bookings, setBookings] =useState([])

  const [dashData,setDashData] =useState(false)

  const getAllVendors = async () => {
    try {
      const { data } = await axios.post(backendUrl + '/api/admin/all-vendors', {}, { headers: { aToken } })
      if (data.success) {
        setVendors(data.vendors)
        console.log(data.vendors);

      } else {
        toast.error(data.message)
      }


    } catch (error) {
      toast.error(error.message)
    }
  }



  const changeAvailability =async (vendorId)=>{
    try {
      
      const {data} =await axios.post(backendUrl + '/api/admin/change-availability', {vendorId}, {headers:{aToken}})

      if(data.success){
        toast.success(data.message)
        getAllVendors()
      }else{
        toast.error(data.message)
      }


    } catch (error) {
      toast.error(error.message)
    }
  }


  const getAllBookings =async()=>{
    try {
      const { data } = await axios.get(backendUrl + '/api/admin/bookings',  { headers: { aToken } })
    
      if(data.success){
        setBookings(data.bookings)
        console.log(data.bookings);
        
      }else{
        toast.error(data.message)
      }
    
    } catch (error) {
      toast.error(error.message)
    }
  }


  const cancelBooking =async(bookingId)=>{
    try {
      const {data} =await axios.post(backendUrl + '/api/admin/cancle-booking', {bookingId},{headers:{aToken}})

      if(data.success){
        toast.success(data.message)
        getAllBookings()
      }else{
        toast.error(data.error)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }



  const getDashData =async()=>{
    try {
      
      const {data} =await axios.get(backendUrl + '/api/admin/dashboard', { headers:{aToken} })
      if(data.success){
        setDashData(data.dashData)
        console.log(data.dashData);
        
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }




  const value = {
    aToken,
    setAToken,
    backendUrl,
    vendors, getAllVendors,
    changeAvailability,
    bookings, setBookings,
    getAllBookings,
    cancelBooking,
    getDashData, dashData
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
