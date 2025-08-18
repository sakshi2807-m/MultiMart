import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from '../context/AppContext';

const Vendors = () => {
  const { category } = useParams();
  const [filterVendors, setFilterVendors] = useState([]);
  const { vendor } = useContext(AppContext);
  const navigate = useNavigate();

  const applyFilter = () => {
    if (category) {
      setFilterVendors(vendor.filter(v => v.category === category));
    } else {
      setFilterVendors(vendor);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [vendor, category]);

  const categories = [
    'Technology',
    'Electrician',
    'Home Services',
    'Plumbing',
    'Health',
    'Painter',
    'Carpainter',
    'Cloth',
    'Groceries'
  ];

  return (
    <div className='text-white px-4 sm:px-6 md:px-10 py-6 transition-all duration-300'>

      <p className='text-xl font-semibold mb-6 text-center md:text-left'>
        Browse through the top Categories
      </p>

      <div className='flex flex-col md:flex-row gap-6'>

        {/* Category Filter */}
        <div className='w-full md:w-1/4 bg-gray-900 p-4 rounded-lg shadow'>
          {categories.map((cat, i) => (
            <p
              key={i}
              onClick={() => category === cat ? navigate('/vendors') : navigate(`/vendors/${cat}`)}
              className={`w-full text-center md:text-left px-4 py-2 border border-green-500 rounded transition-all duration-300 cursor-pointer hover:scale-105 mt-2 ${
                category === cat ? 'bg-green-500 text-white' : ''
              }`}
            >
              {cat}
            </p>
          ))}
        </div>

        {/* Vendor Cards */}
        <div className='w-full md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
          {filterVendors.map((item, index) => (
            <div
            onClick={() => {
              navigate(`/bookings/${item._id}`);
              window.scrollTo(0, 0);
            }}
              key={index}
              className="border border-green-400 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-300 bg-gray-800 shadow-md"
            >
              {/* 1:1 Image */}
              <div className="relative w-full pt-[100%] bg-gray-700">
                <img
                  src={item.image}
                  alt={`Image of ${item.name}`}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              </div>

              {/* Vendor Info */}
              <div className="p-4">
              <div className="flex items-center gap-2 text-xs text-gray-300">
                <span className={`w-2 h-2 ${item.available ? "bg-green-500": "bg-red-500" }  rounded-full`}></span>
                <p>{item.available ? "Available" : "Not Available"}</p>
              </div>
                <p className="text-green-400 font-semibold text-lg">{item.name}</p>
                <p className="text-sm text-gray-400">{item.shopName}</p>
                <p className="text-sm text-gray-400">{item.category}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Vendors;
