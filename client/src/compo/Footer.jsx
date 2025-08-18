import React from 'react';
import logo from "../assets/MultiMart (3)-Photoroom.png";
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white py-10 px-6 md:px-20  mb-30">
      <div className="flex flex-col sm:grid sm:grid-cols-2 md:grid-cols-3 gap-10 mb-10">
        {/* Left */}
        <div>
          <img
            src={logo}
            alt="Logo"
            className="w-32 md:w-40 hover:scale-105 transition-all duration-500"
          />
          <p className="text-xs text-gray-400 mt-3 leading-relaxed">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            <br />
            Ratione tempore mollitia fugiat accusantium debitis.
            <br />
            Aspernatur obcaecati et cupiditate quibusdam fugit deleniti.
          </p>
        </div>

        {/* Center */}
        <div>
          <p className="font-semibold text-xl text-green-500">Company</p>
          <ul className="text-gray-400 text-sm flex flex-col gap-3 mt-5">
            <li
              className="hover:text-green-500 cursor-pointer"
              onClick={() => {
                navigate('/')
                window.scrollTo(0, 0) // Corrected scroll behavior
              }}
            >
              Home
            </li>
            <li
              className="hover:text-green-500 cursor-pointer"
              
              onClick={() => {
                navigate('/about')
                window.scrollTo(0, 0) // Corrected scroll behavior
              }}
            >
              About
            </li>
            <li
              className="hover:text-green-500 cursor-pointer"
              onClick={() => {
                navigate('/contact')
                window.scrollTo(0, 0) // Corrected scroll behavior
              }}
            >
              Contact Us
            </li>
            <li
              className="hover:text-green-500 cursor-pointer"
              onClick={() => {
                navigate('/privacy-policy')
                window.scrollTo(0, 0) // Corrected scroll behavior
              }}
            >
              Privacy Policy
            </li>
          </ul>
        </div>

        {/* Right */}
        <div>
          <p className="font-semibold text-xl text-green-500">Get in Touch</p>
          <ul className="mt-5 text-sm text-gray-400 flex flex-col gap-3">
            <li className="hover:text-green-500 cursor-pointer">+91-987654321</li>
            <li className="hover:text-green-500 cursor-pointer">multimart@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-700 pt-4 text-center text-xs text-gray-500">
        Copyright ©️ 2025 Multimart - All Rights Reserved
      </div>
    </div>
  );
};

export default Footer;
