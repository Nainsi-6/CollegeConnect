import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EventsPage = () => {
  const [showEventForm, setShowEventForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    organizedBy: "",
    date: "",
    time: "",
    venue: "",
    image: null,
    googleFormLink: "",
  });
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    deleteExpiredEvents();
  }, [events]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/events");
      setEvents(response.data);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const deleteExpiredEvents = async () => {
    const today = new Date().toISOString().split("T")[0];

    const validEvents = events.filter(event => event.date >= today);

    if (validEvents.length !== events.length) {
      try {
        await axios.post("http://localhost:5005/api/events/deleteExpired", {
          expiredEvents: events.filter(event => event.date < today),
        });
        setEvents(validEvents);
      } catch (error) {
        console.error("Error deleting expired events:", error);
      }
    }
  };

  const handleFileUpload = (e) => {
    setNewEvent({ ...newEvent, image: e.target.files[0] });
  };

  const addEvent = async () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.venue) {
      alert("Please fill in all required fields.");
      return;
    }

    const formData = new FormData();
    formData.append("title", newEvent.title);
    formData.append("organizedBy", newEvent.organizedBy);
    formData.append("date", newEvent.date);
    formData.append("time", newEvent.time);
    formData.append("venue", newEvent.venue);
    if (newEvent.image) {
      formData.append("file", newEvent.image);
    }
    formData.append("googleFormLink", newEvent.googleFormLink);

    try {
      await axios.post("http://localhost:5005/api/events", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      fetchEvents();
      setShowEventForm(false);
      setNewEvent({
        title: "",
        organizedBy: "",
        date: "",
        time: "",
        venue: "",
        image: null,
        googleFormLink: "",
      });
    } catch (error) {
      console.error("Error adding event:", error);
      alert("Failed to add event.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center">
      <h1 className="text-5xl font-bold text-pink-500 mb-6">Upcoming Events</h1>
      <button
        className="bg-pink-500 text-white px-6 py-3 rounded-lg"
        onClick={() => setShowEventForm(true)}
      >
        + Add Event
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {events.length === 0 ? (
          <p className="text-lg text-gray-400">No events available.</p>
        ) : (
          events.map((event, index) => (
            <div
              key={index}
              className="bg-gray-800 p-6 rounded-xl cursor-pointer hover:bg-gray-700 transition"
              onClick={() => navigate(`/event/${event.id}`)}
            >
              {event.image && <img src={event.image} alt={event.title} className="h-60 w-full" />}
              <h3 className="text-2xl text-pink-400 mt-4">{event.title}</h3>
              <p className="text-gray-300">Organized by: {event.organizedBy}</p>
              <p className="text-gray-400">{event.date} | {event.time}</p>
              <p className="text-gray-300">Venue: {event.venue}</p>
              {event.googleFormLink && (
                <a href={event.googleFormLink} target="_blank" rel="noopener noreferrer" className="text-blue-400">
                  Register Here
                </a>
              )}
            </div>
          ))
        )}
      </div>

      {showEventForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h2 className="text-xl text-pink-400 mb-4">Add New Event</h2>
            <input type="text" placeholder="Title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} className="w-full p-3 mb-3 bg-gray-700 text-white" />
            <input type="text" placeholder="Organized By" value={newEvent.organizedBy} onChange={(e) => setNewEvent({ ...newEvent, organizedBy: e.target.value })} className="w-full p-3 mb-3 bg-gray-700 text-white" />
            <input type="date" value={newEvent.date} onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} className="w-full p-3 mb-3 bg-gray-700 text-white" />
            <input type="time" value={newEvent.time} onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })} className="w-full p-3 mb-3 bg-gray-700 text-white" />
            <input type="text" placeholder="Venue" value={newEvent.venue} onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })} className="w-full p-3 mb-3 bg-gray-700 text-white" />
            <input type="file" onChange={handleFileUpload} className="p-2 mb-3 bg-gray-700 text-white" />
            <input type="url" placeholder="Registration Form Link" value={newEvent.googleFormLink} onChange={(e) => setNewEvent({ ...newEvent, googleFormLink: e.target.value })} className="w-full p-3 mb-3 bg-gray-700 text-white" />
            <button onClick={addEvent} className="w-full py-2 bg-pink-500 text-white">Add Event</button>
            <button onClick={() => setShowEventForm(false)} className="w-full py-2 bg-gray-600 text-white mt-2">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
