import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProfilePage = () => {
  const navigate = useNavigate();
  
  const [profilePic, setProfilePic] = useState(null);
  const [profileDetails, setProfileDetails] = useState({
    name: "",
    username: "",
    email: "",
    branch: "",
    hobbies: "",
    skills: "",
    year: "",
    description: "",
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/profile');
        if (!response.ok) {
          throw new Error('Failed to fetch profile');
        }
        const data = await response.json();
        setProfileDetails(data);
        if (data.profilePic) {
          setProfilePic(data.profilePic);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    setProfileDetails({
      ...profileDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result);
        toast.success("Profile photo uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    Object.entries(profileDetails).forEach(([key, value]) => {
      formData.append(key, value);
    });
  
    if (profilePic) {
      formData.append("profilePic", profilePic);
    }
  
    try {
      const response = await fetch("http://localhost:8000/api/profile", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Failed to save profile");
      }
      
      toast.success("Profile saved successfully!");
    } catch (error) {
      toast.error("Error saving profile. Please try again later.");
      console.error(error);
    }
  };
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100">
      <Navbar />
      <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-black text-center">Profile</h1>
        <div className="flex flex-col items-center">
          <label htmlFor="profile-pic-upload" className="cursor-pointer">
            <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-pink-500">
              {profilePic ? (
                <img src={profilePic} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                  Upload Profile Pic
                </div>
              )}
            </div>
          </label>
          <input
            id="profile-pic-upload"
            type="file"
            accept="image/*"
            onChange={handleProfilePicChange}
            className="hidden"
          />
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {Object.keys(profileDetails).map((key, idx) => (
            <div key={idx} className="flex flex-col">
              <label className="text-black font-medium">{key.charAt(0).toUpperCase() + key.slice(1)}</label>
              <input
                type="text"
                name={key}
                value={profileDetails[key]}
                onChange={handleInputChange}
                className="p-3 text-black border rounded-lg focus:ring-2 focus:ring-pink-500 focus:outline-none"
              />
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-3 mt-4 bg-pink-500 text-white font-bold rounded-lg hover:bg-pink-600"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;