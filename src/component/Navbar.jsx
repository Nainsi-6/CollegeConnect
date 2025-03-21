import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  const handleNavigate = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");  // Remove the token from localStorage
    setUser(null);  // Clear the user state
    navigate("/login");  // Redirect the user to the login page
  };

  return (
    <nav className="bg-gray-700 p-4 text-black flex justify-between items-center shadow-lg">
      {/* Left Section: User Greeting and Search Bar */}
      <div className="flex items-center space-x-4">
        {user && (
          <span className="text-white font-medium text-lg flex items-center">
            <span role="img" aria-label="waving hand" className="mr-2">👋</span>
            Hi, {user.username}
          </span>
        )}
        <input
          type="text"
          placeholder="Search..."
          className="bg-white border-2 border-emerald-600 text-black py-2 px-4 rounded-full"
        />
      </div>

      {/* Right Section: Navigation Links */}
      <div className="flex space-x-6 items-center">
        <button onClick={() => handleNavigate('/home')} className="hover:text-emerald-600 text-white">
          Home
        </button>
        <button onClick={() => handleNavigate('/connect')} className="hover:text-emerald-600 text-white">
          Connect People
        </button>
        <button onClick={() => handleNavigate('/about')} className="hover:text-emerald-600 text-white">
          About Us
        </button>
        <button onClick={() => handleNavigate('/profile')} className="hover:text-emerald-600 text-white">
          Profile
        </button>
        <button onClick={() => handleNavigate('/contact')} className="hover:text-emerald-600 text-white">
          Contact
        </button>
        <button onClick={() => handleNavigate('/chatbot')} className="hover:text-emerald-600 text-white">
          Help
        </button>

        {/* Logout Button: Only visible if a user is logged in */}
        {user && (
          <button
            onClick={handleLogout}
            className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;











