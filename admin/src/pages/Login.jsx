import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import axios from 'axios'
import { toast } from 'react-toastify';
import { VendorContext } from '../context/VendorContext';






const Login = () => {
  const [state, setState] = useState('Admin');
  const [email, setEmail] =useState('')
  const [password, setPassword] =useState('')

  const {setAToken,backendUrl}=useContext(AdminContext)

  const{setVToken }=useContext(VendorContext)

  const submitHandler = async (event) => {
    event.preventDefault();
  
    try {
      if (state === 'Admin') {
        const { data } = await axios.post(`${backendUrl}/api/admin/admin-login`, {
          email,
          password,
        });
  
        // This runs ONLY if status is 200
        if (data.success) {
          localStorage.setItem('aToken', data.token);
          setAToken(data.token);
          toast.success("Login successful");
        } else {
          toast.error(data.message || "Invalid credentials");
        }
      } else {
        
        const {data }= await axios.post(backendUrl + '/api/vendor/login', {email,password})

        if (data.success) {
          localStorage.setItem('vToken', data.token);
          setVToken(data.token);
          toast.success("Login successful");
          console.log(data.token);
        } else {
          toast.error(data.message || "Invalid credentials");
        }


      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
  
      // Robust error message
      const msg =
        error.response?.data?.message || error.message || "Something went wrong";
      toast.error(msg);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <form onSubmit={submitHandler} className="bg-gray-900 p-8 rounded-2xl shadow-xl w-full max-w-sm border border-green-500">
        <div className="mb-6 text-center">
          <p className="text-2xl font-bold text-white">
            <span className='text-green-500'>{state}</span> Login
          </p>
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm font-medium text-white">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            required
            className="w-full px-4 py-2 border border-white rounded-lg bg-gray-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm font-medium text-white">Password</label>
          <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
            type="password"
            required
            className="w-full px-4 py-2 border border-white rounded-lg bg-gray-700 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 transition-all"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition-all"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4 text-gray-300">
          {state === 'Admin' ? 'Vendor Login? ' : 'Admin Login? '}
          <span
            className="text-blue-400 hover:underline cursor-pointer"
            onClick={() => setState(state === 'Admin' ? 'Vendor' : 'Admin')}
          >
            Click here
          </span>
        </p>
      </form>
    </div>
  );
};

export default Login;
