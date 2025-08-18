import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currencySymbol = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [vendor, setVendor] = useState([]);
  
  // ✅ Initialize token from localStorage
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  const [userData, serUserData] = useState(false)



  const getAllVendorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/vendor/list");
      if (data.success) {
        setVendor(data.vendors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const loadUserProfileData = async() =>{
    try {
      const {data} = await  axios.get(backendUrl + '/api/user/get-profile',{headers : {token}} )
      if(data.success){
        serUserData(data.userData)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  }

  useEffect(() => {
    getAllVendorsData();
  }, []);

  useEffect(()=>{
    if(token){
      loadUserProfileData()
    }else{
      serUserData(false)
    }
  },[token])

  // ✅ Keep token in sync with localStorage (optional)
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const value = {
    vendor,
    currencySymbol,
    getAllVendorsData,
    backendUrl,
    token,
    setToken,
    userData, serUserData,loadUserProfileData

  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
