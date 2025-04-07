// src/App.js
// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider, useUser } from './contexts/UserContext';  // Import both UserProvider and useUser

import Login from './component/Login';
import Signup from './component/Signup';
import HomePage from './component/HomePage';
import ProfilePage from './component/ProfilePage';
import AboutUs from './component/AboutUs';
import ContactUs from './component/ContactUs';
import Chatbot from './component/Chatbot';
import ConnectPeople from './component/ConnectPeople';
import ViewProfile from './component/ViewProfile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Event from "./component/Event";

const App = () => {
  return (
    <UserProvider>  {/* Wrap everything inside UserProvider */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/connect" element={<ConnectPeople />} />
          <Route path="/profile/:id" element={<ViewProfile />} />
          <Route path="/events" element={<Event />} />
          
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </UserProvider>
  );
};

export default App;
