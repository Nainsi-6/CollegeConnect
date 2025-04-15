import React, { useState, useEffect } from 'react';
import Navbar from "./Navbar";

const ProfileHeader = ({ 
  name, 
  email, 
  stats = { followers: 0, following: 0, posts: 0 }, 
  editable,
  onPhotoChange,
  profilePhotoUrl,
  coverPhotoUrl
}) => {
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);
  
  useEffect(() => {
    if (coverPhotoUrl) {
      setCoverPhoto(coverPhotoUrl);
    }
    if (profilePhotoUrl) {
      setProfilePhoto(profilePhotoUrl);
    }
  }, [coverPhotoUrl, profilePhotoUrl]);

  const handleCoverUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCoverPhoto(URL.createObjectURL(file));
      if (onPhotoChange) {
        onPhotoChange("cover", file);
      }
    }
  };

  const handleProfileUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePhoto(URL.createObjectURL(file));
      if (onPhotoChange) {
        onPhotoChange("profile", file);
      }
    }
  };

  return (
    <>
    <Navbar />
    <div className="relative w-full bg-gradient-to-r from-blue-100 to-indigo-200 text-gray-800 pb-16">
      {/* Cover Photo */}
      <div className="w-full h-64 bg-gray-300 relative">
        {coverPhoto ? (
          <div className="w-full h-full relative">
            <img
              src={coverPhoto || "/placeholder.svg"}
              alt="Cover"
              className="w-full h-full object-cover"
              draggable="false"
            />
            {editable && (
              <div className="absolute bottom-2 right-2">
                <label htmlFor="coverUpload" className="bg-white bg-opacity-75 hover:bg-opacity-100 p-2 rounded-full cursor-pointer shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </label>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center text-lg font-semibold text-gray-600">
            {editable ? (
              <label htmlFor="coverUpload" className="cursor-pointer">
                Click to upload cover photo
              </label>
            ) : (
              <div>No cover photo</div>
            )}
          </div>
        )}
        {editable && (
          <input
            id="coverUpload"
            type="file"
            accept="image/*"
            onChange={handleCoverUpload}
            className="hidden"
          />
        )}
      </div>

      {/* Profile & Info */}
      <div className="flex flex-col md:flex-row items-center md:items-end gap-4 px-6">
        <div className="relative -mt-20">
          <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-white shadow-lg">
            {profilePhoto ? (
              <div className="relative w-full h-full">
                <img
                  src={profilePhoto || "/placeholder.svg"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                  draggable="false"
                />
                {editable && (
                  <div className="absolute bottom-0 right-0 p-2">
                    <label htmlFor="profileUpload" className="bg-white bg-opacity-75 hover:bg-opacity-100 p-2 rounded-full cursor-pointer shadow-md">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </label>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-500 bg-white">
                {editable ? (
                  <label htmlFor="profileUpload" className="cursor-pointer">
                    Upload
                  </label>
                ) : (
                  <div>No profile photo</div>
                )}
              </div>
            )}
            {editable && (
              <input
                id="profileUpload"
                type="file"
                accept="image/*"
                onChange={handleProfileUpload}
                className="hidden"
              />
            )}
          </div>
        </div>

        {/* Name + Email + Stats */}
        <div className="flex-1">
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-indigo-700">{name}</h1>
            <p className="text-gray-600">{email}</p>
          </div>

          <div className="flex gap-8 justify-center md:justify-start mt-4">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-indigo-600">{stats?.followers || 0}</h2>
              <p className="text-gray-500">Followers</p>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold text-indigo-600">{stats?.following || 0}</h2>
              <p className="text-gray-500">Following</p>
            </div>
            <div className="text-center">
              <h2 className="text-xl font-semibold text-indigo-600">{stats?.posts || 0}</h2>
              <p className="text-gray-500">Posts</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfileHeader;
  
