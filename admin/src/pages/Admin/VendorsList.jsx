import React, { useContext, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';

const VendorsList = () => {
  const { vendors, aToken, getAllVendors,changeAvailability } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllVendors();
    }
  }, [aToken]);

  return (
    <div className="p-4 md:p-8 bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-green-400 mb-6 text-center">All Vendors</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {vendors.map((item, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-2xl shadow-lg p-4 transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-40 object-cover rounded-xl mb-4"
            />
            <div className="text-white">
              <p className="text-xs font-semibold">{item.name}</p>
              <p className="text-lg text-green-500 font-semibold">{item.shopName}</p>
              <p className="text-sm text-gray-400 mb-2">{item.category}</p>
              <div className="flex items-center gap-2">
                <input
                onChange={()=>changeAvailability(item._id)}
                  type="checkbox"
                  checked={item.available}
                  readOnly
                  className="accent-green-500"
                />
                <p className={item.available ? "text-green-400" : "text-red-400"}>
                  {item.available ? "Available" : "Unavailable"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VendorsList;
