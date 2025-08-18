import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import upload_icon from "../assets/upload_icon.png";
import axios from 'axios';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { userData, setUserData, token, backendUrl, loadUserProfileData } = useContext(AppContext);
  const [isEdit, SetEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [editableData, setEditableData] = useState(null);

  useEffect(() => {
    if (userData) {
      setEditableData({ ...userData }); // make a copy for editing
    }
  }, [userData]);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append('name', editableData.name);
      formData.append('phone', editableData.phone);
      formData.append('address', JSON.stringify(editableData.address));
      formData.append('gender', editableData.gender);
      formData.append('dob', editableData.dob);
      if (image) formData.append('image', image);

      const { data } = await axios.put(backendUrl + '/api/user/update-user', formData, {
        headers: { token },
      });

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        SetEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return editableData && (
    <div className="max-w-lg flex flex-col gap-2 text-sm text-white">
      <div className="flex flex-col items-start mb-6">
        {isEdit ? (
          <label htmlFor="image" className="cursor-pointer relative inline-block">
            <img
              className="w-36 rounded opacity-75"
              src={image ? URL.createObjectURL(image) : editableData.image}
              alt="Profile"
            />
            <img className="w-10 absolute bottom-7 right-12" src={upload_icon} alt="Upload" />
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
            />
          </label>
        ) : (
          <img
            src={userData.image}
            alt="Profile"
            className="w-36 rounded border-2 object-cover mb-4"
          />
        )}

        {isEdit ? (
          <input
            type="text"
            value={editableData.name}
            onChange={(e) => setEditableData(prev => ({ ...prev, name: e.target.value }))}
            className="w-full mt-3 p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        ) : (
          <h2 className="text-xl mt-3 font-semibold">{userData.name}</h2>
        )}
      </div>

      <div className="bg-gray-800 rounded-xl shadow-lg p-6 w-full max-w-xl">
        <hr className="border-gray-600 mb-4" />
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 underline mt-3">Contact Information</h3>
          <p className="text-sm text-gray-400 mb-1">Email:</p>
          <p className="mb-2">{userData.email}</p>

          <p className="text-sm text-gray-400 mb-1">Phone:</p>
          {isEdit ? (
            <input
              type="text"
              value={editableData.phone}
              onChange={(e) => setEditableData(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full p-2 mb-3 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          ) : <p className="mb-3">{userData.phone}</p>}

          <p className="text-sm text-gray-400 mb-1">Address:</p>
          {isEdit ? (
            <div className="space-y-2">
              <input
                value={editableData.address.line1}
                onChange={(e) =>
                  setEditableData(prev => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                type="text"
                className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                value={editableData.address.line2}
                onChange={(e) =>
                  setEditableData(prev => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                type="text"
                className="w-full p-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
            </div>
          ) : (
            <p className="mb-3">{userData.address.line1}<br />{userData.address.line2}</p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Basic Information</h3>

          <p className="text-sm text-gray-400 mb-1">Gender:</p>
          {isEdit ? (
            <select
              value={editableData.gender}
              onChange={(e) => setEditableData(prev => ({ ...prev, gender: e.target.value }))}
              className="w-full p-2 mb-3 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          ) : (
            <p className="mb-3">{userData.gender}</p>
          )}

          <p className="text-sm text-gray-400 mb-1">Birthday:</p>
          {isEdit ? (
            <input
              type="date"
              value={editableData.dob}
              onChange={(e) => setEditableData(prev => ({ ...prev, dob: e.target.value }))}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-400 [&::-webkit-calendar-picker-indicator]:invert"
            />
          ) : (
            <p>{userData.dob}</p>
          )}
        </div>

        <div className="mt-6 text-left">
          {isEdit ? (
            <button
              onClick={updateUserProfileData}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 transition rounded-md font-medium"
            >
              Save Information
            </button>
          ) : (
            <button
              onClick={() => SetEdit(true)}
              className="px-6 py-2 bg-green-500 hover:bg-green-600 transition rounded-md font-medium"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
