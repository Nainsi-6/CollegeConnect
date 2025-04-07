import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar'; // Assuming you have a Navbar component

const ContactUs = () => {
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  const handleFeedbackSubmit = () => {
    // Here you can add logic to submit feedback (e.g., send to a server or save in local storage)
    alert('Feedback submitted: ' + feedback);
    setFeedback(''); // Clear the input after submission
  };

  return (
    <div 
      className="bg-cover bg-center min-h-screen" 
      style={{ 
        backgroundImage: 'url("https://example.com/your-image.jpg")', // Replace with your image URL
        backgroundColor: '#282c34', // Fallback background color if the image doesn't load
      }}
    >
      {/* Sticky Navbar */}
      <div style={{ position: 'sticky', top: 0, zIndex: 1000 }}>
        <Navbar />
      </div>

      {/* Contact Us Section */}
      <div 
        className="contact-us-content shadow-lg" 
        style={{
          padding: '40px', 
          maxWidth: '600px', 
          margin: '80px auto', 
          backgroundColor: 'rgba(0, 0, 0, 0.7)', // Semi-transparent dark background
          borderRadius: '15px', 
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        }}
      >
        <h2 className="text-3xl font-bold text-center text-gradient mb-6">
          Send Your Feedback
        </h2>
        
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Write your feedback here..."
          rows="6"
          className="border-2 border-gradient mb-5 w-full text-lg text-black outline-none bg-transparent rounded-lg py-2 px-4"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }} // Light semi-transparent background for text area
        />
        
        <button
          onClick={handleFeedbackSubmit}
          className="mt-5 text-lg text-white bg-gradient-to-r from-teal-400 to-cyan-600 hover:bg-gradient-to-l rounded-lg py-2 w-full"
        >
          Submit Feedback
        </button>
      </div>
    </div>
  );
};

export default ContactUs;
