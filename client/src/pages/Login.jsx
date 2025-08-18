import React, { useContext, useState } from 'react';
import { AppContext } from "../context/AppContext";
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { backendUrl, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  
    try {
      if (state === "Sign Up") {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password
        });
  
        if (data.success) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user)); // ✅ Save user object
          localStorage.setItem('userId', data.user._id);           // ✅ Save userId
          setToken(data.token);
          toast.success("Account created successfully!");
          navigate('/');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password
        });
  
        if (data.success) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('user', JSON.stringify(data.user)); // ✅ Save user object
          localStorage.setItem('userId', data.user._id);           // ✅ Save userId
          setToken(data.token);
          toast.success("Logged in successfully!");
          navigate('/');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Something went wrong");
    }
  };
  
  
  return (
    <form onSubmit={onSubmitHandler} className="min-h-[0vh] flex items-center justify-center">
      <div className="flex flex-col gap-4 p-8 min-w-[340px] sm:min-w-[400px] border border-green-500 rounded-xl shadow-lg bg-gray-800 text-white">
        <p className="text-2xl font-semibold text-center text-green-400">
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </p>
        <p className="text-sm text-gray-300 text-center mb-4">
          Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book service
        </p>

        {state === 'Sign Up' && (
          <div className="w-full">
            <label className="block mb-1 text-gray-300">Full Name</label>
            <input
              type="text"
              className="border border-white rounded w-full p-2 bg-gray-700 text-white focus:outline-none focus:border-green-400 transition-all duration-300"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
        )}

        <div className="w-full">
          <label className="block mb-1 text-gray-300">E-mail</label>
          <input
            type="email"
            className="border border-white rounded w-full p-2 bg-gray-700 text-white focus:outline-none focus:border-green-400 transition-all duration-300"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />
        </div>

        <div className="w-full">
          <label className="block mb-1 text-gray-300">Password</label>
          <input
            type="password"
            className="border border-white rounded w-full p-2 bg-gray-700 text-white focus:outline-none focus:border-green-400 transition-all duration-300"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white py-2 rounded transition-all duration-300"
        >
          {state === 'Sign Up' ? 'Create Account' : 'Login'}
        </button>

        <p
          className="text-sm text-center mt-2 text-blue-400 hover:underline cursor-pointer"
          onClick={() => setState(state === 'Sign Up' ? 'Login' : 'Sign Up')}
        >
          {state === 'Sign Up' ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
        </p>
      </div>
    </form>
  );
};

export default Login;
