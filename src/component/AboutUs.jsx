import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Sticky Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>

      {/* Hero Section with Image */}
      <div
        className="relative h-[50vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://cache.careers360.mobi/media/article_images/2024/3/4/VIT-Bhopal-admission-2024-featured-image.webp')",
        }}
      >
        {/* Transparent Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center text-white">
          <h1 className="text-5xl font-bold mb-2">Welcome to VIT Bhopal Alumni Connect</h1>
          <p className="text-lg mt-4">
            Bridging students, faculty, and alumni under one vibrant platform
          </p>
        </div>
      </div>

      {/* About Us Section */}
      <div className="max-w-4xl mx-auto bg-purple-50 text-gray-900 rounded-lg shadow-lg p-8 mt-10">
        <h2 className="text-3xl font-semibold text-purple-600 mb-4">About Us</h2>
        <p className="text-lg leading-relaxed text-black">
          VIT Bhopal Alumni Connect is a platform designed to bring together
          students, faculty, and alumni to foster meaningful interactions. We aim to create a collaborative space
          where knowledge sharing, networking, and mentorship thrive.
        </p>
      </div>

      {/* Key Features Section */}
      <div className="max-w-5xl mx-auto mt-12 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="bg-pink-100 border border-pink-300 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-pink-600 mb-2">
            Share Your Thoughts
          </h3>
          <p className="text-sm text-gray-700">
            Post your ideas and engage with others in meaningful discussions.
          </p>
        </div>
        <div className="bg-purple-100 border border-purple-300 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-purple-600 mb-2">
            Event Updates
          </h3>
          <p className="text-sm text-gray-700">
            Stay informed about the latest college events and activities.
          </p>
        </div>
        <div className="bg-pink-100 border border-pink-300 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-pink-600 mb-2">
            Real-Time Notifications
          </h3>
          <p className="text-sm text-gray-700">
            Receive alerts about new opportunities and announcements.
          </p>
        </div>
        <div className="bg-purple-100 border border-purple-300 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-purple-600 mb-2">
            Direct Messaging
          </h3>
          <p className="text-sm text-gray-700">
            Chat with alumni, faculty, and students instantly.
          </p>
        </div>
        <div className="bg-pink-100 border border-pink-300 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-pink-600 mb-2">
            Resource Sharing
          </h3>
          <p className="text-sm text-gray-700">
            Upload and access notes, projects, and study materials easily.
          </p>
        </div>
        <div className="bg-purple-100 border border-purple-300 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
          <h3 className="text-xl font-semibold text-purple-600 mb-2">
            Community Building
          </h3>
          <p className="text-sm text-gray-700">
            Build a strong network with peers and mentors.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-purple-700 py-4 mt-12 text-white">
        <h3 className="text-center text-lg mb-4">Follow Us</h3>
        <div className="flex justify-center space-x-6">
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            LinkedIn
          </a>
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Facebook
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Twitter
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;