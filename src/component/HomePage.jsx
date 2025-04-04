// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from './Navbar';

// const HomePage = () => {
//   const [postText, setPostText] = useState('');
//   const [postImage, setPostImage] = useState(null);
//   const [posts, setPosts] = useState(() => {
//     const savedPosts = localStorage.getItem('posts');
//     return savedPosts ? JSON.parse(savedPosts) : [];
//   });
//   const handleDeletePost = (index) => {
//     const updatedPosts = posts.filter((_, i) => i !== index);
//     setPosts(updatedPosts);
//   };

//   const [events, setEvents] = useState(() => {
//     const savedEvents = localStorage.getItem('events');
//     return savedEvents ? JSON.parse(savedEvents) : [];
//   });

//   const [showEventForm, setShowEventForm] = useState(false);
//   const [newEvent, setNewEvent] = useState({
//     title: '',
//     organizedBy: '',
//     date: '',
//     time: '',
//     venue: '',
//     image: null, // Add image field
//   });

//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const navigate = useNavigate();

//   // Save posts and events to localStorage
//   useEffect(() => {
//     localStorage.setItem('posts', JSON.stringify(posts));
//   }, [posts]);

//   useEffect(() => {
//     localStorage.setItem('events', JSON.stringify(events));
//   }, [events]);

//   // Handle adding a new event
//   const addEvent = () => {
//     if (
//       newEvent.title.trim() &&
//       newEvent.organizedBy.trim() &&
//       newEvent.date &&
//       newEvent.time &&
//       newEvent.venue.trim()
//     ) {
//       const updatedEvents = [...events, newEvent].sort(
//         (a, b) => new Date(a.date) - new Date(b.date)
//       );
//       setEvents(updatedEvents);
//       setNewEvent({
//         title: '',
//         organizedBy: '',
//         date: '',
//         time: '',
//         venue: '',
//         image: null, // Reset image field
//       });
//       setShowEventForm(false);
//     }
//   };

//   // Handle deleting an event
//   const handleDeleteEvent = (index) => {
//     const updatedEvents = events.filter((_, i) => i !== index);
//     setEvents(updatedEvents);
//   };

//   // Handle post creation
//   const createPost = () => {
//     if (postText.trim() && postImage) {
//       const newPost = {
//         text: postText,
//         image: postImage,
//         likes: 0,
//         dislikes: 0,
//         liked: null,  // Keeps track of user choice: null (no choice), 1 (liked), 0 (disliked)
//         comments: [],
//       };
//       setPosts([...posts, newPost]);
//       setPostText('');
//       setPostImage(null);
//     }
//   };

//   // Handle liking or disliking a post
//   const handleLikeDislike = (index, type) => {
//     const updatedPosts = [...posts];
//     const post = updatedPosts[index];

//     // If the user hasn't liked or disliked, set the like/dislike accordingly
//     if (post.liked === null) {
//       if (type === 'like') {
//         post.likes += 1;
//         post.liked = 1;
//       } else if (type === 'dislike') {
//         post.dislikes += 1;
//         post.liked = 0;
//       }
//     } else if (post.liked === 1 && type === 'dislike') {
//       // If the post is already liked, clicking dislike will decrement like and increment dislike
//       post.likes -= 1;
//       post.dislikes += 1;
//       post.liked = 0;
//     } else if (post.liked === 0 && type === 'like') {
//       // If the post is already disliked, clicking like will decrement dislike and increment like
//       post.dislikes -= 1;
//       post.likes += 1;
//       post.liked = 1;
//     }

//     setPosts(updatedPosts);
//   };

//   // Handle adding a comment
//   const handleAddComment = (index, commentText) => {
//     if (commentText.trim()) {
//       const updatedPosts = [...posts];
//       updatedPosts[index].comments.push(commentText);
//       setPosts(updatedPosts);
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen">
//       {/* Sticky Navbar */}
//       <div className="sticky top-0 z-10 bg-white shadow-md">
//         <Navbar />
//       </div>

//       {/* Greeting Section */}
//       <div className="text-left text-gray-700 pt-10 pl-10">
//         <h2 className="text-3xl font-bold mb-6 text-pink-600">Welcome! 👋</h2>
//       </div>

//       {/* Post creation section */}
//       <div className={`w-[50%] mx-auto mb-5 bg-white p-5 rounded-xl shadow-lg flex flex-col space-y-4 ${isSidebarOpen ? 'ml-80' : ''}`}>
//         <textarea
//           className="w-full p-3 border-2 border-gray-300 rounded-lg h-32 text-gray-700"
//           placeholder="Write something..."
//           value={postText}
//           onChange={(e) => setPostText(e.target.value)}
//         />
//         <input
//           type="file"
//           onChange={(e) => {
//             const file = e.target.files[0];
//             if (file) {
//               const reader = new FileReader();
//               reader.onloadend = () => {
//                 setPostImage(reader.result);
//               };
//               reader.readAsDataURL(file);
//             }
//           }}
//           className="p-2 border-2 border-gray-300 rounded-lg"
//         />
//         <button
//           onClick={createPost}
//           className="py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
//         >
//           Post
//         </button>
//       </div>

//       {/* Posts Section */}
//       <div className={`w-[50%] mx-auto mt-10 space-y-6 ${isSidebarOpen ? 'ml-80' : ''}`}>
//         {posts.map((post, index) => (
//           <div key={index} className="bg-white p-5 mb-6 rounded-lg shadow-xl border height-auto border-gray-200">
//             <h3 className="text-xl  text-gray-800">{post.text}</h3>
//             <div className="mt-3 flex flex-col">
//               {post.image && <img src={post.image} alt="Post" className="max-w-full h-auto rounded-lg" />}
//             </div>
//             <div className="flex space-x-4 mt-4">
//               <button
//                 onClick={() => handleLikeDislike(index, 'like')}
//                 className="py-2 px-4 text-xl text-black"
//               >
//                 👍 {post.likes}
//               </button>
//               <button
//                 onClick={() => handleLikeDislike(index, 'dislike')}
//                 className="py-2 px-4 text-xl text-black"
//               >
//                 👎 {post.dislikes}
//               </button>
//               <button
//                 onClick={() => setPostText(post.text)} // Optional: for showing the post text when adding a comment
//                 className="py-2 px-4 text-blue-600 text-black"
//               >
//                 ☁️ Comment
//               </button>
//               <button
//                 onClick={() => handleDeletePost(index)} // Delete button for post
//                 className="text-red-600 hover:text-red-700"
//               >
//                 Delete Post
//               </button>
            
//             </div>

//             {/* Comments Section */}
//             <div className="mt-4">
//               <input
//                 type="text"
//                 className="w-full p-2 border-2 border-gray-300 rounded-lg text-black"
//                 placeholder="Add a comment..."
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter') {
//                     handleAddComment(index, e.target.value);
//                     e.target.value = '';
//                   }
//                 }}
//               />
//               <ul className="mt-2 space-y-2">
//                 {post.comments.map((comment, idx) => (
//                   <li key={idx} className="text-gray-600 text-sm">
//                     {comment}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Upcoming Events Sidebar */}
//       <div>
//         <button
//           className="fixed bottom-5 right-5 bg-pink-600 text-white p-3 rounded-full shadow-lg hover:bg-pink-700"
//           onClick={() => setIsSidebarOpen(!isSidebarOpen)}
//         >
//           📅
//         </button>

//         {isSidebarOpen && (
//           <div className="fixed top-0 right-0 w-80 h-full bg-white shadow-lg z-20 p-5">
//             <h3 className="text-xl font-bold text-pink-600 mb-4">Upcoming Events</h3>
//             <ul className="space-y-4">
//               {events.map((event, index) => (
//                 <li key={index} className="border-b pb-2">
//                   <div className="flex items-center space-x-4">
//                     {event.image && <img src={event.image} alt="Event" className="w-16 h-16 rounded-lg object-cover" />}
//                     <div>
//                       <h4 className="font-bold">{event.title}</h4>
//                       <p className="text-gray-600 text-sm">Organized by: {event.organizedBy}</p>
//                       <p className="text-gray-600 text-sm">Date: {event.date}</p>
//                       <p className="text-gray-600 text-sm">Time: {event.time}</p>
//                       <p className="text-gray-600 text-sm">Venue: {event.venue}</p>
//                     </div>
//                     <button
//                       onClick={() => handleDeleteEvent(index)}
//                       className="text-red-600 hover:text-red-700"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//             <button
//               className="mt-4 w-full py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
//               onClick={() => setShowEventForm(true)}
//             >
//               Add Event
//             </button>
//             <button
//               className="mt-4 w-full py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
//               onClick={() => setIsSidebarOpen(false)}
//             >
//               Close Events
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Event Form */}
//       {showEventForm && (
//         <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h2 className="text-xl font-semibold text-pink-600 mb-4">Add New Event</h2>
//             <input
//               type="text"
//               placeholder="Title"
//               value={newEvent.title}
//               onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
//               className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 text-black"
//             />
//             <input
//               type="text"
//               placeholder="Organized By"
//               value={newEvent.organizedBy}
//               onChange={(e) => setNewEvent({ ...newEvent, organizedBy: e.target.value })}
//               className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 text-black"
//             />
//             <input
//               type="date"
//               value={newEvent.date}
//               onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
//               className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 text-black"
//             />
//             <input
//               type="time"
//               value={newEvent.time}
//               onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
//               className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 text-black"
//             />
//             <input
//               type="text"
//               placeholder="Venue"
//               value={newEvent.venue}
//               onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
//               className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 text-black"
//             />
//             <input
//               type="file"
//               onChange={(e) => {
//                 const file = e.target.files[0];
//                 if (file) {
//                   const reader = new FileReader();
//                   reader.onloadend = () => {
//                     setNewEvent({ ...newEvent, image: reader.result });
//                   };
//                   reader.readAsDataURL(file);
//                 }
//               }}
//               className="p-2 border-2 border-gray-300 rounded-lg mb-4"
//             />
//             <input
//           type="url"
//           placeholder="Enter Registration Form Link"
//           value={newEvent.googleFormLink}
//           onChange={(e) => setNewEvent({ ...newEvent, googleFormLink: e.target.value })}
//           className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 text-black"
//         />
        
//         {/* If the googleFormLink exists, render it as a clickable link */}
//         {newEvent.googleFormLink && (
//           <div className="mt-2">
//             <a 
//               href={newEvent.googleFormLink} 
//               target="_blank" 
//               rel="noopener noreferrer" 
//               className="text-blue-600 hover:text-blue-700"
//             >
//               Click here to access the Registration Form
//             </a>
//           </div>
//         )}
//             <button
//               onClick={addEvent}
//               className="w-full py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700"
//             >
//               Add Event
//             </button>
//             <button
//               onClick={() => setShowEventForm(false)}
//               className="w-full py-2 bg-gray-600 text-white rounded-lg mt-2 hover:bg-gray-700"
//             >
//               Cancel
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomePage;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Navbar from './Navbar';

// const HomePage = () => {
//   const [postText, setPostText] = useState('');
//   const [postImage, setPostImage] = useState(null);
//   const [posts, setPosts] = useState(() => {
//     const savedPosts = localStorage.getItem('posts');
//     return savedPosts ? JSON.parse(savedPosts) : [];
//   });

//   const [collegeUpdates, setCollegeUpdates] = useState([
//     'Semester exams begin from March 25, 2025.',
//     'New courses on AI & Machine Learning introduced this semester.',
//   ]);

//   const [achievements, setAchievements] = useState([
//     'Team VIT won 1st place in the National Hackathon 2025.',
//     'Prof. Sharma awarded "Best Researcher of the Year."',
//   ]);

//   const [trendingTopics, setTrendingTopics] = useState([
//     '#Hackathon2025',
//     '#AIRevolution',
//     '#StudentLife',
//   ]);

//   const [recentComments, setRecentComments] = useState([
//     { user: 'Ritika', text: 'Great post! 👏' },
//     { user: 'Gouri', text: 'Very insightful 🔥' },
//   ]);

//   const navigate = useNavigate();

//   // Save posts to localStorage
//   useEffect(() => {
//     localStorage.setItem('posts', JSON.stringify(posts));
//   }, [posts]);

//   const handleDeletePost = (index) => {
//     setPosts(posts.filter((_, i) => i !== index));
//   };

//   const createPost = () => {
//     if (postText.trim() || postImage) {
//       const newPost = {
//         text: postText,
//         image: postImage,
//         likes: 0,
//         dislikes: 0,
//         liked: null,
//         comments: [],
//       };
//       setPosts([...posts, newPost]);
//       setPostText('');
//       setPostImage(null);
//     }
//   };

//   const handleLikeDislike = (index, type) => {
//     const updatedPosts = [...posts];
//     const post = updatedPosts[index];

//     if (post.liked === null) {
//       post.liked = type === 'like' ? 1 : 0;
//       type === 'like' ? post.likes++ : post.dislikes++;
//     } else if (post.liked === 1 && type === 'dislike') {
//       post.likes--;
//       post.dislikes++;
//       post.liked = 0;
//     } else if (post.liked === 0 && type === 'like') {
//       post.dislikes--;
//       post.likes++;
//       post.liked = 1;
//     }

//     setPosts(updatedPosts);
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPostImage(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const addComment = (index, commentText) => {
//     const updatedPosts = [...posts];
//     const post = updatedPosts[index];
//     post.comments.push({ user: 'Anonymous', text: commentText });
//     setPosts(updatedPosts);
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-100">
//       {/* Sticky Navbar */}
//       <Navbar />
//       <div className="container mx-auto py-8 px-4">
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           {/* Left Sidebar */}
//           <div className="md:col-span-1">
//             {/* College Updates */}
//             <div className="bg-gray-800 p-5 rounded-lg shadow-md mb-5">
//               <h3 className="text-lg font-semibold text-gray-300">📢 College Updates</h3>
//               <ul className="list-disc list-inside">
//                 {collegeUpdates.map((update, index) => (
//                   <li key={index} className="text-gray-400">{update}</li>
//                 ))}
//               </ul>
//             </div>

//             {/* Achievements */}
//             <div className="bg-gray-800 p-5 rounded-lg shadow-md">
//               <h3 className="text-lg font-semibold text-gray-300">🏆 Achievements</h3>
//               <ul className="list-disc list-inside">
//                 {achievements.map((achieve, index) => (
//                   <li key={index} className="text-gray-400">{achieve}</li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//                     {/* Main Feed */}
//                     <div className="md:col-span-2">
//             {posts.map((post, index) => (
//               <div key={index} className="bg-gray-800 p-5 rounded-lg shadow-md mb-5">
//                 <p className="text-gray-200">{post.text}</p>
//                 {post.image && (
//                   <img
//                     src={post.image}
//                     alt="Post"
//                     className="mt-3 rounded-lg w-full max-h-64 object-cover"
//                   />
//                 )}
//                 <div className="flex gap-3 mt-2">
//                   <button
//                     onClick={() => handleLikeDislike(index, 'like')}
//                     className="text-green-400"
//                   >
//                     👍 {post.likes}
//                   </button>
//                   <button
//                     onClick={() => handleLikeDislike(index, 'dislike')}
//                     className="text-red-400"
//                   >
//                     👎 {post.dislikes}
//                   </button>
//                   <button
//                     onClick={() => handleDeletePost(index)}
//                     className="text-red-500 ml-auto"
//                   >
//                     🗑️ Delete
//                   </button>
//                 </div>
//                 {/* Comment Section */}
//                 <div className="mt-4">
//                   <h4 className="text-gray-300">Comments</h4>
//                   {post.comments.map((comment, cIndex) => (
//                     <p key={cIndex} className="text-gray-400">
//                       <b>{comment.user}:</b> {comment.text}
//                     </p>
//                   ))}
//                   <textarea
//                     className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-gray-300 mt-2"
//                     placeholder="Add a comment..."
//                     onKeyDown={(e) => {
//                       if (e.key === 'Enter' && !e.shiftKey) {
//                         e.preventDefault();
//                         if (e.target.value.trim()) {
//                           addComment(index, e.target.value.trim());
//                           e.target.value = '';
//                         }
//                       }
//                     }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>

//                    {/* Right Sidebar */}
//                    <div className="md:col-span-1">
//             {/* Create Post */}
//             <div className="bg-gray-800 p-5 rounded-lg shadow-md mb-5">
//               <h3 className="text-lg font-semibold text-gray-300">Create Post</h3>
//               <textarea
//                 className="w-full h-32 bg-gray-700 border border-gray-600 rounded-lg p-2 text-gray-300"
//                 placeholder="Write something..."
//                 value={postText}
//                 onChange={(e) => setPostText(e.target.value)}
//               />
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageUpload}
//                 className="mt-2 text-gray-400"
//               />
//               {postImage && (
//                 <img
//                   src={postImage}
//                   alt="Preview"
//                   className="mt-2 rounded-lg max-h-40 object-cover"
//                 />
//               )}
//               <button
//                 onClick={createPost}
//                 className="mt-3 py-2 px-4 bg-blue-500 text-white rounded-md w-full"
//               >
//                 Post
//               </button>
//             </div>

//             {/* Recent Comments */}
//             <div className="bg-gray-800 p-5 rounded-lg shadow-md">
//               <h3 className="text-lg font-semibold text-gray-300">💬 Recent Comments</h3>
//               {recentComments.map((comment, index) => (
//                 <p key={index} className="text-gray-400">
//                   <b>{comment.user}:</b> {comment.text}
//                 </p>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { useUser } from "../contexts/UserContext";

const HomePage = () => {
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState(null);
  const [posts, setPosts] = useState(() => {
    const savedPosts = localStorage.getItem("posts");
    return savedPosts ? JSON.parse(savedPosts) : [];
  });
  const [announcements, setAnnouncements] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalType, setModalType] = useState(""); // 'announcement' or 'achievement'
  const [loading, setLoading] = useState({
    announcements: false,
    achievements: false
  });
  const [error, setError] = useState({
    announcements: null,
    achievements: null
  });
  
  const { user } = useUser();
  const navigate = useNavigate();
  const [showComments, setShowComments] = useState({});

  // Fetch data from backend on component mount
  useEffect(() => {
    localStorage.setItem("posts", JSON.stringify(posts));
    fetchAnnouncements();
    fetchAchievements();
  }, [posts]);

  // Fetch announcements from API
  const fetchAnnouncements = async () => {
    setLoading(prev => ({...prev, announcements: true}));
    setError(prev => ({...prev, announcements: null}));
    
    try {
      const response = await fetch("http://localhost:5005/api/announcements");
      if (!response.ok) {
        throw new Error(`Failed to fetch announcements: ${response.statusText}`);
      }
      const data = await response.json();
      setAnnouncements(data.map(item => `📌 ${item.description}`));
    } catch (err) {
      setError(prev => ({...prev, announcements: err.message}));
      console.error("Error fetching announcements:", err);
    } finally {
      setLoading(prev => ({...prev, announcements: false}));
    }
  };

  // Fetch achievements from API
  const fetchAchievements = async () => {
    setLoading(prev => ({...prev, achievements: true}));
    setError(prev => ({...prev, achievements: null}));
    
    try {
      const response = await fetch("http://localhost:5005/api/achievements");
      if (!response.ok) {
        throw new Error(`Failed to fetch achievements: ${response.statusText}`);
      }
      const data = await response.json();
      setAchievements(data.map(item => `🎉 ${item.description}`));
    } catch (err) {
      setError(prev => ({...prev, achievements: err.message}));
      console.error("Error fetching achievements:", err);
    } finally {
      setLoading(prev => ({...prev, achievements: false}));
    }
  };

  // Add announcement API call
  const addAnnouncementAPI = async (description) => {
    try {
      const response = await fetch("http://localhost:5005/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add announcement: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error("Error adding announcement:", error);
      return null;
    }
  };

  // Add achievement API call
  const addAchievementAPI = async (description) => {
    try {
      const response = await fetch("http://localhost:5005/api/achievements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });

      if (!response.ok) {
        throw new Error(`Failed to add achievement: ${response.statusText}`);
      }

      return response.json();
    } catch (error) {
      console.error("Error adding achievement:", error);
      return null;
    }
  };

  const createPost = () => {
    if (postText.trim() || postImage) {
      const newPost = {
        text: postText,
        image: postImage,
        likes: 0,
        dislikes: 0,
        liked: null,
        comments: [],
      };
      setPosts([newPost, ...posts]);
      setPostText("");
      setPostImage(null);
    }
  };

  const handleDeletePost = (index) => {
    setPosts(posts.filter((_, i) => i !== index));
  };

  const handleLikeDislike = (index, type) => {
    const updatedPosts = [...posts];
    const post = updatedPosts[index];

    if (post.liked === null) {
      post.liked = type === "like" ? 1 : 0;
      type === "like" ? post.likes++ : post.dislikes++;
    } else if (post.liked === 1 && type === "dislike") {
      post.likes--;
      post.dislikes++;
      post.liked = 0;
    } else if (post.liked === 0 && type === "like") {
      post.dislikes--;
      post.likes++;
      post.liked = 1;
    }

    setPosts(updatedPosts);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPostImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExploreEvents = () => {
    navigate("/events");
  };

  const openModal = (type) => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalContent("");
  };

  const submitModal = async () => {
    if (!modalContent.trim()) return;
  
    try {
      if (modalType === "announcement") {
        await addAnnouncementAPI(modalContent);
        await fetchAnnouncements();
      } else {
        await addAchievementAPI(modalContent);
        await fetchAchievements();
      }
      closeModal();
    } catch (error) {
      console.error("Error: Submission failed.", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Navbar />
      <div className="container mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Sidebar - Announcements & Achievements */}
        <div className="hidden md:block md:col-span-1">
          {/* Announcements Section */}
          <div className="bg-purple-700 p-5 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">📢 Announcements</h3>
              {user && (
                <button 
                  onClick={() => openModal("announcement")}
                  className="text-white bg-purple-800 px-2 py-1 rounded text-sm"
                >
                  Add
                </button>
              )}
            </div>
            {loading.announcements ? (
              <p className="text-white mt-2">Loading announcements...</p>
            ) : error.announcements ? (
              <p className="text-red-300 mt-2">Error: {error.announcements}</p>
            ) : (
              <ul className="mt-2 text-white">
                {announcements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Achievements Section */}
          <div className="bg-blue-600 mt-6 p-5 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">🏆 Achievements</h3>
              {user && (
                <button 
                  onClick={() => openModal("achievement")}
                  className="text-white bg-blue-700 px-2 py-1 rounded text-sm"
                >
                  Add
                </button>
              )}
            </div>
            {loading.achievements ? (
              <p className="text-white mt-2">Loading achievements...</p>
            ) : error.achievements ? (
              <p className="text-red-300 mt-2">Error: {error.achievements}</p>
            ) : (
              <ul className="mt-2 text-white">
                {achievements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
          </div>

          {/* Explore Events Section */}
          <div className="bg-green-600 mt-6 p-5 rounded-lg shadow-md cursor-pointer" onClick={handleExploreEvents}>
            <h3 className="text-lg font-semibold text-white">🌟 Explore Events</h3>
            <p className="mt-2 text-white">Check out the latest events happening!</p>
          </div>
        </div>

        {/* Main Feed - Center (Posts Section) */}
        <div className="md:col-span-2">
          {/* Displaying Posts */}
          {posts.map((post, index) => (
            <div key={index} className="bg-gray-800 p-5 rounded-lg shadow-md mb-5 max-w-[90%] mx-auto">
              <p className="text-gray-200">{post.text}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="Post"
                  className="mt-3 rounded-lg w-full max-h-60 object-cover"
                />
              )}
              <div className="flex gap-3 mt-2">
                <button onClick={() => handleLikeDislike(index, "like")} className="text-green-400">
                  👍 {post.likes}
                </button>
                <button onClick={() => handleLikeDislike(index, "dislike")} className="text-red-400">
                  👎 {post.dislikes}
                </button>
                <button
                  onClick={() =>
                    setShowComments((prev) => ({
                      ...prev,
                      [index]: !prev[index],
                    }))
                  }
                  className="text-blue-400"
                >
                  💬 {post.comments.length} Comments
                </button>
                <button onClick={() => handleDeletePost(index)} className="text-red-500 ml-auto">
                  🗑️ Delete
                </button>
              </div>

              {/* Toggle Comments Section */}
              {showComments[index] && (
                <div className="mt-4">
                  <h4 className="text-gray-300">Comments</h4>
                  {post.comments.map((comment, cIndex) => (
                    <p key={cIndex} className="text-gray-400">
                      <b>{comment.user}:</b> {comment.text}
                    </p>
                  ))}

                  {user ? (
                    <textarea
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-gray-300 mt-2"
                      placeholder="Add a comment..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          if (e.target.value.trim()) {
                            const updatedPosts = [...posts];
                            updatedPosts[index].comments.push({ user: user.name, text: e.target.value.trim() });
                            setPosts(updatedPosts);
                            e.target.value = "";
                          }
                        }
                      }}
                    />
                  ) : (
                    <p className="text-red-400 mt-2">Log in to comment.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Sidebar - Profile & Create Post Box */}
        <div className="hidden md:block md:col-span-1">
          {/* Profile Section */}
          <div className="bg-[#D8BFD8] p-6 rounded-lg shadow-lg mb-6 text-center">
            {user ? (
              <>
                <div className="flex justify-center">
                  <img
                    src={user.profileImage || "https://tse1.mm.bing.net/th?id=OIP.MoLuogvKSS_uEhep5nvcuQHaID&pid=Api&P=0&h=180"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
                  />
                </div>
                <h3 className="text-2xl font-extrabold text-gray-800 mt-4">{user.username}</h3>
                <p className="text-gray-700 text-sm font-bold mt-1">Pre-final year student at VIT Bhopal University</p>
                <p className="text-gray-600 text-xs font-bold">Banda, Uttar Pradesh</p>
                <div className="mt-3 flex justify-center items-center">
                  <span className="text-purple-700 font-bold text-sm">🔹 Bluestock™</span>
                </div>
                <div className="bg-[#E6C6FF] p-4 rounded-lg mt-5 text-sm font-bold shadow-inner">
                  <div className="flex justify-between text-gray-800">
                    <span>Profile viewers</span>
                    <span className="text-purple-900">156</span>
                  </div>
                  <div className="flex justify-between text-gray-800 mt-3">
                    <span>Post impressions</span>
                    <span className="text-purple-900">311</span>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-gray-800 font-bold">Log in to see your profile.</p>
            )}
          </div>

          {/* Create a Post Section */}
          <div className="bg-gray-800 p-5 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-300">Create a Post</h3>
            <textarea
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-300 mt-2"
              placeholder="What's on your mind?"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-2 text-gray-400"
            />
            {postImage && (
              <img
                src={postImage}
                alt="Preview"
                className="mt-2 rounded-lg max-h-48 object-cover w-full"
              />
            )}
            <button
              onClick={createPost}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-3 rounded-lg w-full"
            >
              Post
            </button>
          </div>
        </div>
      </div>

      {/* Modal for adding announcements/achievements */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-semibold text-white mb-4">
              Add {modalType === "announcement" ? "Announcement" : "Achievement"}
            </h3>
            <textarea
              className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-300 mb-4"
              placeholder={`Enter ${modalType === "announcement" ? "announcement" : "achievement"} description...`}
              value={modalContent}
              onChange={(e) => setModalContent(e.target.value)}
              rows={4}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={submitModal}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;