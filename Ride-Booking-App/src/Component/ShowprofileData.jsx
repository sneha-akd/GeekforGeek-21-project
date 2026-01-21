import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Star } from "lucide-react";
import { updateProfileData } from "../../Store/app";


const ShowprofileData = () => {
  const { name, email, phoneNumber } = useSelector(
    (state) => state.app.userData
  );

  const { rating, rides } = useSelector(
    (state) => state.app.userStats
  );

  const [currentProfile, setCurrentProfile] = useState({
    name,
    email,
    phoneNumber,
  });

  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProfile((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  function handlesavechnage() {
    dispatch(updateProfileData(currentProfile));
    setIsEditing(false);

  }


  return (
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-md p-6 space-y-6 shadow-md px-3 my-5">
      {/* Profile Card */}


      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-800">Profile</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-sm font-medium text-green-600 hover:text-green-700"
        >
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      {/* Profile Info */}
      <div className="space-y-2">
        <p className="text-lg font-medium text-gray-900">
          {currentProfile.name}
        </p>

        <div className="flex items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            {rating}
          </span>
          <span>{rides} rides</span>
        </div>

        <p className="text-sm text-gray-600">{currentProfile.email}</p>
        <p className="text-sm text-gray-600">{currentProfile.phoneNumber}</p>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <div className="space-y-4 border-t border-gray-200 pt-4">
          <input
            type="text"
            name="name"
            placeholder="Your full Name"
            value={currentProfile.name}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={currentProfile.email}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <input
            type="tel"
            name="phoneNumber"
            placeholder="Your contact number with isd code"
            value={currentProfile.phoneNumber}
            onChange={handleChange}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <button onClick={handlesavechnage} className="w-full bg-green-600 text-white py-2 rounded-md text-sm font-medium hover:bg-green-700 transition">
            Save Changes
          </button>
        </div>
      )}
    </div>

  );
};

export default ShowprofileData;
