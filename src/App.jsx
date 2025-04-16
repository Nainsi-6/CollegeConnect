import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import Login from './component/Login';
import Signup from './component/Signup';
import HomePage from './component/HomePage';
import AboutUs from './component/AboutUs';
import ContactUs from './component/ContactUs';
import Chatbot from './component/Chatbot';
// import ConnectPeople from './component/ConnectPeople';
import ConnectPeople from './pages/ConnectPeople';
import ViewProfile from './component/ViewProfile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Event from "./component/Event";
import ProfilePage from "./component/ProfilePage"; // Add this import
import StudentProfile from './component/StudentProfile';
import AlumniProfile from './component/AlumniProfile';
import FacultyProfile from './component/FacultyProfile';
import ProfileView from './component/ProfileView';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<HomePage />} />
          {/* Keep this single Profile route for logged-in user */}
          <Route path="/profile" element={<ProfilePage />} />
          {/* Use this route if you want to view specific user profiles */}
          <Route path="/view-profile/:userId" element={<ViewProfile />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/connect" element={<ConnectPeople />} />
          <Route path="/events" element={<Event />} />
          {/* Specific profile routes for each type */}
          <Route path="/student-profile" element={<StudentProfile />} />
          <Route path="/alumni-profile" element={<AlumniProfile />} />
          <Route path="/faculty-profile" element={<FacultyProfile />} />
          <Route path="/profile/:userId" element={<ProfileView />} />
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
