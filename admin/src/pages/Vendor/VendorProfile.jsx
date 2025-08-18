import React, { useContext, useEffect, useState } from 'react'
import { VendorContext } from '../../context/VendorContext'
import { AppContext } from '../../context/Appcontext'
import { FaEdit } from "react-icons/fa"
import axios from 'axios'
import { toast } from 'react-toastify'

const VendorProfile = () => {
  const { vToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(VendorContext)
  const { currency } = useContext(AppContext)

  const [edit, setEdit] = useState(false)

  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,
        about: profileData.about,
        services: profileData.services, // ✅ Include services in update
      }

      const { data } = await axios.post(
        backendUrl + '/api/vendor/update-profile',
        updateData,
        { headers: { vToken } }
      )

      if (data.success) {
        toast.success(data.message)
        setEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error.message)
    }
  }

  useEffect(() => {
    if (vToken) {
      getProfileData()
    }
  }, [vToken])

  return profileData && (
    <div className="w-full min-h-screen p-6 bg-gray-900 text-white">
      <h2 className="text-3xl font-bold mb-6">Vendor Profile</h2>

      <div className="bg-gray-800 rounded-2xl p-6 shadow-lg grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image and Basic Info */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src={profileData.image}
            alt={profileData.name}
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-700 mb-4"
          />
          <div className="text-center md:text-left">
            <p className="text-xl font-semibold">{profileData.name}</p>
            <p className="text-gray-400">{profileData.shopName}</p>
            <p className="text-sm text-gray-400">{profileData.email}</p>
          </div>
          <button className="mt-4 bg-green-600 px-4 py-1 text-sm rounded-xl">
            {profileData.category}
          </button>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-400">GST No.</p>
              <p className="font-medium">{profileData.gstNo || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Aadhaar No.</p>
              <p className="font-medium">{profileData.aadharNo || "N/A"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">URN No.</p>
              <p className="font-medium">{profileData.urnNo || "N/A"}</p>
            </div>

            {/* Booking Fees */}
            <div>
              <p className="text-sm text-gray-400">Booking Fees</p>
              <p className="font-medium">
                {currency}{" "}
                {edit ? (
                  <input
                    type="number"
                    className="bg-gray-700 text-white px-2 py-1 rounded w-full"
                    onChange={(e) =>
                      setProfileData((prev) => ({
                        ...prev,
                        fees: e.target.value,
                      }))
                    }
                    value={profileData.fees}
                  />
                ) : (
                  profileData.fees
                )}
              </p>
            </div>
          </div>

          {/* Services */}
          <div>
            <p className="text-sm text-gray-400">Services</p>
            <div className="space-y-2">
              {profileData.services?.map((service, index) => (
                <div key={index} className="flex flex-col sm:flex-row sm:items-center gap-2">
                  {edit ? (
                    <>
                      <input
                        type="text"
                        placeholder="Service Name"
                        className="bg-gray-700 text-white px-2 py-1 rounded w-full sm:w-1/2"
                        value={service.name}
                        onChange={(e) => {
                          const updatedServices = [...profileData.services]
                          updatedServices[index].name = e.target.value
                          setProfileData((prev) => ({ ...prev, services: updatedServices }))
                        }}
                      />
                      <input
                        type="number"
                        placeholder="Price"
                        className="bg-gray-700 text-white px-2 py-1 rounded w-full sm:w-1/2"
                        value={service.price}
                        onChange={(e) => {
                          const updatedServices = [...profileData.services]
                          updatedServices[index].price = e.target.value
                          setProfileData((prev) => ({ ...prev, services: updatedServices }))
                        }}
                      />
                    </>
                  ) : (
                    <p className="text-gray-300">
                      {service.name} - {currency}{service.price}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Address */}
          <div>
            <p className="text-sm text-gray-400">Address</p>
            <p className="font-medium">
              {edit ? (
                <input
                  type="text"
                  className="bg-gray-700 text-white px-2 py-1 rounded w-full"
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                  value={profileData.address.line1}
                />
              ) : (
                profileData.address.line1
              )}
            </p>
            <p className="font-medium">
              {edit ? (
                <input
                  type="text"
                  className="bg-gray-700 text-white px-2 py-1 rounded w-full"
                  onChange={(e) =>
                    setProfileData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                  value={profileData.address.line2}
                />
              ) : (
                profileData.address.line2
              )}
            </p>
          </div>

          {/* About */}
          <div>
            <p className="text-sm text-gray-400">About</p>
            {edit ? (
              <textarea
                className="w-full bg-gray-700 text-white px-2 py-1 rounded"
                rows="3"
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    about: e.target.value,
                  }))
                }
                value={profileData.about}
              />
            ) : (
              <p className="text-gray-300">{profileData.about}</p>
            )}
          </div>

          {/* Availability Toggle */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              className="accent-green-500"
              checked={profileData.available}
              onChange={(e) =>
                edit &&
                setProfileData((prev) => ({
                  ...prev,
                  available: e.target.checked,
                }))
              }
              
             
            />
            <label className="text-sm">Available</label>
          </div>

          {/* Buttons */}
          {edit ? (
            <button
              onClick={updateProfile}
              className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-xl hover:bg-green-500 transition w-fit"
            >
              <FaEdit />
              Save Profile
            </button>
          ) : (
            <button
              onClick={() => setEdit(true)}
              className="flex items-center gap-2 bg-blue-600 px-4 py-2 rounded-xl hover:bg-blue-500 transition w-fit"
            >
              <FaEdit />
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default VendorProfile
