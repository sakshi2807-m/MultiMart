import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import {useNavigate} from 'react-router-dom'
import { VendorContext } from '../context/VendorContext';




const Navbar = () => {
  const { aToken , setAToken} = useContext(AdminContext);
  const {vToken, setVToken} =useContext(VendorContext)
  const navigate = useNavigate()


  const logout =()=>{
    navigate('/')
    aToken && setAToken ('')
    aToken && localStorage.removeItem('aToken')
    vToken && setVToken('')
    vToken && localStorage.removeItem('vToken')
  vToken&& setVToken('')
  }

  return (
    <nav className="bg-gray-900 px-6 py-4 shadow-md flex items-center justify-between border-b border-green-500">
      <div className="flex items-center gap-3">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-green-500">MultiMart</h1>
        <p className="text-sm text-white opacity-80 border rounded-full px-3 py-1" >{aToken ? 'Admin' : 'Vendor'}</p>
      </div>

      <button
      onClick={logout}
        className="bg-green-500 hover:bg-green-600 text-white font-medium px-4 py-2 rounded-lg transition-all duration-300"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
