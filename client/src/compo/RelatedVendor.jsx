import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedVendor = ({ category, vendorId }) => {
  const { vendor } = useContext(AppContext)

  const [relVendor, setRelVendor] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    if (vendor && Array.isArray(vendor) && category) {
      const vendorData = vendor.filter(
        (vendor) => vendor.category === category && vendor._id !== vendorId
      )
      setRelVendor(vendorData)
    }
  }, [vendor, category, vendorId])

  return (
    <div className="text-white flex flex-col items-center gap-6 my-10 px-4 sm:px-6 md:px-10 lg:px-20">
      <h1 className="text-green-500 text-2xl sm:text-3xl font-semibold text-center">Top Service Providers</h1>

      <p className="text-sm sm:text-base md:text-lg text-center text-gray-300 max-w-xl">
        Simply browse through our extensive list of trusted service providers
      </p>

      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 pt-4">
        {relVendor.slice(0, 5).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/bookings/${item._id}`)
              window.scrollTo(0, 0) // Corrected scroll behavior
            }}
            key={index}
            className="border border-green-400 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-transform duration-300 bg-gray-800 shadow-md"
          >
            <div className="w-full aspect-w-1 aspect-h-1 bg-gray-700">
              <img
                src={item.image || 'default-image-url'} // Fallback image
                alt={`Image of ${item.name}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-3">
            <div className="flex items-center gap-2 text-xs text-gray-300">
                <span className={`w-2 h-2 ${item.available ? "bg-green-500": "bg-red-500" }  rounded-full`}></span>
                <p>{item.available ? "Available" : "Not Available"}</p>
              </div>
              <p className="text-green-400 font-medium mt-1">{item.name}</p>
              <p className="text-xs text-gray-400">{item.shopName}</p>
              <p className="text-xs text-gray-400">{item.category}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          navigate('/vendors')
          window.scrollTo(0, 0) // Corrected scroll behavior
        }}
        className="mt-6 px-5 py-2 text-sm sm:text-base bg-green-500 text-white rounded hover:bg-green-600 transition duration-300"
      >
        View More
      </button>
    </div>
  )
}

export default RelatedVendor
