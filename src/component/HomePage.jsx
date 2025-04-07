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

// hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./Navbar";
// import { useUser } from "../contexts/UserContext";

// const HomePage = () => {
//   const [postText, setPostText] = useState("");
//   const [postImages, setPostImages] = useState([]);
//   const [posts, setPosts] = useState(() => {
//     const savedPosts = localStorage.getItem("posts");
//     return savedPosts ? JSON.parse(savedPosts) : [];
//   });
//   const [announcements, setAnnouncements] = useState([]);
//   const [achievements, setAchievements] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [modalContent, setModalContent] = useState("");
//   const [modalType, setModalType] = useState(""); // 'announcement' or 'achievement'
//   const [loading, setLoading] = useState({
//     announcements: false,
//     achievements: false
//   });
//   const [error, setError] = useState({
//     announcements: null,
//     achievements: null
//   });
  
//   const { user } = useUser();
//   const navigate = useNavigate();
//   const [showComments, setShowComments] = useState({});

//   // Fetch data from backend on component mount
//   useEffect(() => {
//     localStorage.setItem("posts", JSON.stringify(posts));
//     fetchAnnouncements();
//     fetchAchievements();
//   }, [posts]);

//   // Fetch announcements from API
//   const fetchAnnouncements = async () => {
//     setLoading(prev => ({...prev, announcements: true}));
//     setError(prev => ({...prev, announcements: null}));
    
//     try {
//       const response = await fetch("http://localhost:5005/api/announcements");
//       if (!response.ok) {
//         throw new Error(`Failed to fetch announcements: ${response.statusText}`);
//       }
//       const data = await response.json();
//       setAnnouncements(data.map(item => `📌 ${item.description}`));
//     } catch (err) {
//       setError(prev => ({...prev, announcements: err.message}));
//       console.error("Error fetching announcements:", err);
//     } finally {
//       setLoading(prev => ({...prev, announcements: false}));
//     }
//   };

//   // Fetch achievements from API
//   const fetchAchievements = async () => {
//     setLoading(prev => ({...prev, achievements: true}));
//     setError(prev => ({...prev, achievements: null}));
    
//     try {
//       const response = await fetch("http://localhost:5005/api/achievements");
//       if (!response.ok) {
//         throw new Error(`Failed to fetch achievements: ${response.statusText}`);
//       }
//       const data = await response.json();
//       setAchievements(data.map(item => `🎉 ${item.description}`));
//     } catch (err) {
//       setError(prev => ({...prev, achievements: err.message}));
//       console.error("Error fetching achievements:", err);
//     } finally {
//       setLoading(prev => ({...prev, achievements: false}));
//     }
//   };

//   // Add announcement API call
//   const addAnnouncementAPI = async (description) => {
//     try {
//       const response = await fetch("http://localhost:5005/api/announcements", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ description }),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to add announcement: ${response.statusText}`);
//       }

//       return response.json();
//     } catch (error) {
//       console.error("Error adding announcement:", error);
//       return null;
//     }
//   };

//   // Add achievement API call
//   const addAchievementAPI = async (description) => {
//     try {
//       const response = await fetch("http://localhost:5005/api/achievements", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ description }),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to add achievement: ${response.statusText}`);
//       }

//       return response.json();
//     } catch (error) {
//       console.error("Error adding achievement:", error);
//       return null;
//     }
//   };

//   // const createPost = () => {
//   //   if (postText.trim() || postImage) {
//   //     const newPost = {
//   //       text: postText,
//   //       image: postImage,
//   //       likes: 0,
//   //       dislikes: 0,
//   //       liked: null,
//   //       comments: [],
//   //     };
//   //     setPosts([newPost, ...posts]);
//   //     setPostText("");
//   //     setPostImage(null);
//   //   }
//   // };

//   // const handleDeletePost = (index) => {
//   //   setPosts(posts.filter((_, i) => i !== index));
//   // };

//   // const handleLikeDislike = (index, type) => {
//   //   const updatedPosts = [...posts];
//   //   const post = updatedPosts[index];

//   //   if (post.liked === null) {
//   //     post.liked = type === "like" ? 1 : 0;
//   //     type === "like" ? post.likes++ : post.dislikes++;
//   //   } else if (post.liked === 1 && type === "dislike") {
//   //     post.likes--;
//   //     post.dislikes++;
//   //     post.liked = 0;
//   //   } else if (post.liked === 0 && type === "like") {
//   //     post.dislikes--;
//   //     post.likes++;
//   //     post.liked = 1;
//   //   }

//   //   setPosts(updatedPosts);
//   // };

//   // const handleImageUpload = (e) => {
//   //   const file = e.target.files[0];
//   //   if (file) {
//   //     const reader = new FileReader();
//   //     reader.onloadend = () => {
//   //       setPostImage(reader.result);
//   //     };
//   //     reader.readAsDataURL(file);
//   //   }
//   // };

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     setPostImages(files);
//   };
  

//   const handleExploreEvents = () => {
//     navigate("/events");
//   };

//   const openModal = (type) => {
//     setModalType(type);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setModalContent("");
//   };

//   const submitModal = async () => {
//     if (!modalContent.trim()) return;
  
//     try {
//       if (modalType === "announcement") {
//         await addAnnouncementAPI(modalContent);
//         await fetchAnnouncements();
//       } else {
//         await addAchievementAPI(modalContent);
//         await fetchAchievements();
//       }
//       closeModal();
//     } catch (error) {
//       console.error("Error: Submission failed.", error);
//     }
//   };

//   // const fetchPosts = async () => {
//   //   try {
//   //     const res = await fetch("http://localhost:5005/api/posts");
//   //     const data = await res.json();
//   //     setPosts(data);
//   //   } catch (err) {
//   //     console.error("Error fetching posts:", err);
//   //   }
//   // };
  
//   // useEffect(() => {
//   //   fetchPosts();
//   // }, []);

//   const fetchPosts = async () => {
//     try {
//       const res = await fetch("http://localhost:5005/api/posts");
//       const data = await res.json();
//       setPosts(data);
//     } catch (err) {
//       console.error("Error fetching posts:", err);
//     }
//   };
  
//   useEffect(() => {
//     fetchPosts();
//   }, []);
  
//   const createPost = async () => {
//     if (!postText.trim() && postImages.length === 0) return;
  
//     const formData = new FormData();
//     formData.append("title", ""); // You can use a title field too if needed
//     formData.append("content", postText);
//     formData.append("userId", user._id);        // From context
//     formData.append("username", user.name);     // Assuming you have this too
  
//     postImages.forEach((img) => {
//       formData.append("images", img);  // key name must match backend: "images"
//     });
  
//     try {
//       const response = await fetch("http://localhost:5005/api/posts", {
//         method: "POST",
//         body: formData,
//       });
  
//       if (!response.ok) throw new Error("Failed to create post");
  
//       const data = await response.json();
//       setPosts((prev) => [data, ...prev]);
//       setPostText("");
//       setPostImages([]);
//     } catch (err) {
//       console.error("Error creating post:", err);
//     }
//   };
  
  
  

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-100">
//       <Navbar />
//       <div className="container mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
//         {/* Left Sidebar - Announcements & Achievements */}
//         <div className="hidden md:block md:col-span-1">
//           {/* Announcements Section */}
//           <div className="bg-purple-700 p-5 rounded-lg shadow-md">
//             <div className="flex justify-between items-center">
//               <h3 className="text-lg font-semibold text-white">📢 Announcements</h3>
//               {user && (
//                 <button 
//                   onClick={() => openModal("announcement")}
//                   className="text-white bg-purple-800 px-2 py-1 rounded text-sm"
//                 >
//                   Add
//                 </button>
//               )}
//             </div>
//             {loading.announcements ? (
//               <p className="text-white mt-2">Loading announcements...</p>
//             ) : error.announcements ? (
//               <p className="text-red-300 mt-2">Error: {error.announcements}</p>
//             ) : (
//               <ul className="mt-2 text-white">
//                 {announcements.map((item, index) => (
//                   <li key={index}>{item}</li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           {/* Achievements Section */}
//           <div className="bg-blue-600 mt-6 p-5 rounded-lg shadow-md">
//             <div className="flex justify-between items-center">
//               <h3 className="text-lg font-semibold text-white">🏆 Achievements</h3>
//               {user && (
//                 <button 
//                   onClick={() => openModal("achievement")}
//                   className="text-white bg-blue-700 px-2 py-1 rounded text-sm"
//                 >
//                   Add
//                 </button>
//               )}
//             </div>
//             {loading.achievements ? (
//               <p className="text-white mt-2">Loading achievements...</p>
//             ) : error.achievements ? (
//               <p className="text-red-300 mt-2">Error: {error.achievements}</p>
//             ) : (
//               <ul className="mt-2 text-white">
//                 {achievements.map((item, index) => (
//                   <li key={index}>{item}</li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           {/* Explore Events Section */}
//           <div className="bg-green-600 mt-6 p-5 rounded-lg shadow-md cursor-pointer" onClick={handleExploreEvents}>
//             <h3 className="text-lg font-semibold text-white">🌟 Explore Events</h3>
//             <p className="mt-2 text-white">Check out the latest events happening!</p>
//           </div>
//         </div>

//         {/* Main Feed - Center (Posts Section) */}
//         <div className="md:col-span-2">
//           {/* Displaying Posts */}
//           {posts.map((post, index) => (
//             <div key={index} className="bg-gray-800 p-5 rounded-lg shadow-md mb-5 max-w-[90%] mx-auto">
//               <p className="text-gray-200">{post.text}</p>
//               {post.image && (
//                 <img
//                   src={post.image}
//                   alt="Post"
//                   className="mt-3 rounded-lg w-full max-h-60 object-cover"
//                 />
//               )}
//               <div className="flex gap-3 mt-2">
//                 <button onClick={() => handleLikeDislike(index, "like")} className="text-green-400">
//                   👍 {post.likes}
//                 </button>
//                 <button onClick={() => handleLikeDislike(index, "dislike")} className="text-red-400">
//                   👎 {post.dislikes}
//                 </button>
//                 <button
//                   onClick={() =>
//                     setShowComments((prev) => ({
//                       ...prev,
//                       [index]: !prev[index],
//                     }))
//                   }
//                   className="text-blue-400"
//                 >
//                   💬 {post.comments.length} Comments
//                 </button>
//                 <button onClick={() => handleDeletePost(index)} className="text-red-500 ml-auto">
//                   🗑️ Delete
//                 </button>
//               </div>

//               {/* Toggle Comments Section */}
//               {showComments[index] && (
//                 <div className="mt-4">
//                   <h4 className="text-gray-300">Comments</h4>
//                   {post.comments.map((comment, cIndex) => (
//                     <p key={cIndex} className="text-gray-400">
//                       <b>{comment.user}:</b> {comment.text}
//                     </p>
//                   ))}

//                   {user ? (
//                     <textarea
//                       className="w-full bg-gray-700 border border-gray-600 rounded-lg p-2 text-gray-300 mt-2"
//                       placeholder="Add a comment..."
//                       onKeyDown={(e) => {
//                         if (e.key === "Enter" && !e.shiftKey) {
//                           e.preventDefault();
//                           if (e.target.value.trim()) {
//                             const updatedPosts = [...posts];
//                             updatedPosts[index].comments.push({ user: user.name, text: e.target.value.trim() });
//                             setPosts(updatedPosts);
//                             e.target.value = "";
//                           }
//                         }
//                       }}
//                     />
//                   ) : (
//                     <p className="text-red-400 mt-2">Log in to comment.</p>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Right Sidebar - Profile & Create Post Box */}
//         <div className="hidden md:block md:col-span-1">
//           {/* Profile Section */}
//           <div className="bg-[#D8BFD8] p-6 rounded-lg shadow-lg mb-6 text-center">
//             {user ? (
//               <>
//                 <div className="flex justify-center">
//                   <img
//                     src={user.profileImage || "https://tse1.mm.bing.net/th?id=OIP.MoLuogvKSS_uEhep5nvcuQHaID&pid=Api&P=0&h=180"}
//                     alt="Profile"
//                     className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
//                   />
//                 </div>
//                 <h3 className="text-2xl font-extrabold text-gray-800 mt-4">{user.username}</h3>
//                 <p className="text-gray-700 text-sm font-bold mt-1">Pre-final year student at VIT Bhopal University</p>
//                 <p className="text-gray-600 text-xs font-bold">Banda, Uttar Pradesh</p>
//                 <div className="mt-3 flex justify-center items-center">
//                   <span className="text-purple-700 font-bold text-sm">🔹 Bluestock™</span>
//                 </div>
//                 <div className="bg-[#E6C6FF] p-4 rounded-lg mt-5 text-sm font-bold shadow-inner">
//                   <div className="flex justify-between text-gray-800">
//                     <span>Profile viewers</span>
//                     <span className="text-purple-900">156</span>
//                   </div>
//                   <div className="flex justify-between text-gray-800 mt-3">
//                     <span>Post impressions</span>
//                     <span className="text-purple-900">311</span>
//                   </div>
//                 </div>
//               </>
//             ) : (
//               <p className="text-gray-800 font-bold">Log in to see your profile.</p>
//             )}
//           </div>

//           {/* Create a Post Section */}
//           <div className="bg-gray-800 p-5 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold text-gray-300">Create a Post</h3>
//             <textarea
//               className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-300 mt-2"
//               placeholder="What's on your mind?"
//               value={postText}
//               onChange={(e) => setPostText(e.target.value)}
//             />
//             <input
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={handleImageUpload}
//               className="mt-2 text-gray-400"
//             />

//        {postImages.length === 0 ? (
//   <p className="text-gray-400 mt-2">No images to display</p>
// ) : (
//   postImages.map((file, idx) => (
//     <p key={idx} className="text-gray-300 text-sm mt-1">
//       {file.name}
//     </p>
//   ))
//             )}
//             <button
//               onClick={createPost}
//               className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 mt-3 rounded-lg w-full"
//             >
//               Post
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Modal for adding announcements/achievements */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
//             <h3 className="text-xl font-semibold text-white mb-4">
//               Add {modalType === "announcement" ? "Announcement" : "Achievement"}
//             </h3>
//             <textarea
//               className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-300 mb-4"
//               placeholder={`Enter ${modalType === "announcement" ? "announcement" : "achievement"} description...`}
//               value={modalContent}
//               onChange={(e) => setModalContent(e.target.value)}
//               rows={4}
//             />
//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={closeModal}
//                 className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={submitModal}
//                 className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HomePage;


// hereeiiiiiiiiii
 

// "use client"

// import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
// import Navbar from "./Navbar"
// import { useUser } from "../contexts/UserContext"

// const HomePage = () => {
//   const [postText, setPostText] = useState("")
//   const [postImages, setPostImages] = useState([])
//   const [selectedImages, setSelectedImages] = useState([])
//   const [posts, setPosts] = useState([])
//   const [announcements, setAnnouncements] = useState([])
//   const [achievements, setAchievements] = useState([])
//   const [showModal, setShowModal] = useState(false)
//   const [modalContent, setModalContent] = useState("")
//   const [modalType, setModalType] = useState("") // 'announcement' or 'achievement'
//   const [loading, setLoading] = useState({
//     posts: false,
//     announcements: false,
//     achievements: false,
//   })
//   const [error, setError] = useState({
//     posts: null,
//     announcements: null,
//     achievements: null,
//   })

//   const { user } = useUser()
//   const navigate = useNavigate()
//   const [showComments, setShowComments] = useState({})
//   const [isDeleting, setIsDeleting] = useState(false)

//   // Fetch data from backend on component mount
//   useEffect(() => {
//     fetchAnnouncements()
//     fetchAchievements()
//     fetchPosts()
//   }, [])

//   // Fetch announcements from API
//   const fetchAnnouncements = async () => {
//     setLoading((prev) => ({ ...prev, announcements: true }))
//     setError((prev) => ({ ...prev, announcements: null }))

//     try {
//       const response = await fetch("http://localhost:5005/api/announcements")
//       if (!response.ok) {
//         throw new Error(`Failed to fetch announcements: ${response.statusText}`)
//       }
//       const data = await response.json()
//       setAnnouncements(data.map((item) => `📌 ${item.description}`))
//     } catch (err) {
//       setError((prev) => ({ ...prev, announcements: err.message }))
//       console.error("Error fetching announcements:", err)
//     } finally {
//       setLoading((prev) => ({ ...prev, announcements: false }))
//     }
//   }

//   // Fetch achievements from API
//   const fetchAchievements = async () => {
//     setLoading((prev) => ({ ...prev, achievements: true }))
//     setError((prev) => ({ ...prev, achievements: null }))

//     try {
//       const response = await fetch("http://localhost:5005/api/achievements")
//       if (!response.ok) {
//         throw new Error(`Failed to fetch achievements: ${response.statusText}`)
//       }
//       const data = await response.json()
//       setAchievements(data.map((item) => `🎉 ${item.description}`))
//     } catch (err) {
//       setError((prev) => ({ ...prev, achievements: err.message }))
//       console.error("Error fetching achievements:", err)
//     } finally {
//       setLoading((prev) => ({ ...prev, achievements: false }))
//     }
//   }

//   // Add announcement API call
//   const addAnnouncementAPI = async (description) => {
//     try {
//       const response = await fetch("http://localhost:5005/api/announcements", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ description }),
//       })

//       if (!response.ok) {
//         throw new Error(`Failed to add announcement: ${response.statusText}`)
//       }

//       return response.json()
//     } catch (error) {
//       console.error("Error adding announcement:", error)
//       return null
//     }
//   }

//   // Add achievement API call
//   const addAchievementAPI = async (description) => {
//     try {
//       const response = await fetch("http://localhost:5005/api/achievements", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ description }),
//       })

//       if (!response.ok) {
//         throw new Error(`Failed to add achievement: ${response.statusText}`)
//       }

//       return response.json()
//     } catch (error) {
//       console.error("Error adding achievement:", error)
//       return null
//     }
//   }

//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files)
//     setPostImages(files)

//     // Create preview URLs for the selected images
//     const imagePreviewUrls = files.map((file) => ({
//       file,
//       url: URL.createObjectURL(file),
//     }))

//     setSelectedImages(imagePreviewUrls)
//   }

//   const removeSelectedImage = (index) => {
//     // Revoke the object URL to avoid memory leaks
//     URL.revokeObjectURL(selectedImages[index].url)

//     // Remove the image from both arrays
//     const newSelectedImages = [...selectedImages]
//     newSelectedImages.splice(index, 1)
//     setSelectedImages(newSelectedImages)

//     const newPostImages = [...postImages]
//     newPostImages.splice(index, 1)
//     setPostImages(newPostImages)
//   }

//   const handleExploreEvents = () => {
//     navigate("/events")
//   }

//   const openModal = (type) => {
//     setModalType(type)
//     setShowModal(true)
//   }

//   const closeModal = () => {
//     setShowModal(false)
//     setModalContent("")
//   }

//   const submitModal = async () => {
//     if (!modalContent.trim()) return

//     try {
//       if (modalType === "announcement") {
//         await addAnnouncementAPI(modalContent)
//         await fetchAnnouncements()
//       } else {
//         await addAchievementAPI(modalContent)
//         await fetchAchievements()
//       }
//       closeModal()
//     } catch (error) {
//       console.error("Error: Submission failed.", error)
//     }
//   }

//   const fetchPosts = async () => {
//     setLoading((prev) => ({ ...prev, posts: true }))
//     setError((prev) => ({ ...prev, posts: null }))

//     try {
//       const res = await fetch("http://localhost:5005/api/posts")
//       if (!res.ok) {
//         throw new Error(`Failed to fetch posts: ${res.statusText}`)
//       }
//       const data = await res.json()
//       setPosts(data)
//     } catch (err) {
//       setError((prev) => ({ ...prev, posts: err.message }))
//       console.error("Error fetching posts:", err)
//     } finally {
//       setLoading((prev) => ({ ...prev, posts: false }))
//     }
//   }

//   const createPost = async () => {
//     if (!postText.trim() && postImages.length === 0) return

//     if (!user) {
//       alert("Please log in to create a post")
//       return
//     }

//     setLoading((prev) => ({ ...prev, posts: true }))

//     const formData = new FormData()
//     formData.append("content", postText)
//     formData.append("userId", user._id)
//     formData.append("username", user.name)

//     // Add each image to the formData
//     postImages.forEach((img) => {
//       formData.append("images", img)
//     })

//     try {
//       const response = await fetch("http://localhost:5005/api/posts", {
//         method: "POST",
//         body: formData,
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.error || "Failed to create post")
//       }

//       // Refresh posts after successful creation
//       await fetchPosts()
//       setPostText("")
//       setPostImages([])
//       setSelectedImages([])
//     } catch (err) {
//       console.error("Error creating post:", err)
//       alert("Failed to create post: " + err.message)
//     } finally {
//       setLoading((prev) => ({ ...prev, posts: false }))
//     }
//   }

//   const handleLikePost = async (postId) => {
//     if (!user) {
//       alert("Please log in to like posts")
//       return
//     }

//     try {
//       const res = await fetch(`http://localhost:5005/api/posts/${postId}/like`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId: user._id }),
//       })

//       if (!res.ok) {
//         throw new Error("Failed to like post")
//       }

//       const updatedPost = await res.json()

//       // Update the post in the state
//       setPosts((prevPosts) => prevPosts.map((post) => (post._id === postId ? updatedPost : post)))
//     } catch (err) {
//       console.error("Error liking post:", err)
//     }
//   }

//   const handleDislikePost = async (postId) => {
//     if (!user) {
//       alert("Please log in to dislike posts")
//       return
//     }

//     try {
//       const res = await fetch(`http://localhost:5005/api/posts/${postId}/dislike`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId: user._id }),
//       })

//       if (!res.ok) {
//         throw new Error("Failed to dislike post")
//       }

//       const updatedPost = await res.json()

//       // Update the post in the state
//       setPosts((prevPosts) => prevPosts.map((post) => (post._id === postId ? updatedPost : post)))
//     } catch (err) {
//       console.error("Error disliking post:", err)
//     }
//   }

//   const handleAddComment = async (postId, text) => {
//     if (!user) {
//       alert("Please log in to comment")
//       return
//     }

//     if (!text.trim()) return

//     try {
//       const res = await fetch(`http://localhost:5005/api/posts/${postId}/comment`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           text,
//           userId: user._id,
//           username: user.name,
//         }),
//       })

//       if (!res.ok) {
//         throw new Error("Failed to add comment")
//       }

//       const updatedPost = await res.json()

//       // Update the post in the state
//       setPosts((prevPosts) => prevPosts.map((post) => (post._id === postId ? updatedPost : post)))
//     } catch (err) {
//       console.error("Error adding comment:", err)
//     }
//   }

//   const handleDeletePost = async (postId) => {
//     if (!user) return

//     if (!window.confirm("Are you sure you want to delete this post?")) {
//       return
//     }

//     setIsDeleting(true)

//     try {
//       const res = await fetch(`http://localhost:5005/api/posts/${postId}`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId: user._id }),
//       })

//       if (!res.ok) {
//         const errorData = await res.json()
//         throw new Error(errorData.error || "Failed to delete post")
//       }

//       // Remove the post from state
//       setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId))
//     } catch (err) {
//       console.error("Error deleting post:", err)
//       alert("Failed to delete post: " + err.message)
//     } finally {
//       setIsDeleting(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-100">
//       <Navbar />
//       <div className="container mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
//         {/* Left Sidebar - Announcements & Achievements */}
//         <div className="hidden md:block md:col-span-1">
//           {/* Announcements Section */}
//           <div className="bg-purple-700 p-5 rounded-lg shadow-md">
//             <div className="flex justify-between items-center">
//               <h3 className="text-lg font-semibold text-white">📢 Announcements</h3>
//               {user && (
//                 <button
//                   onClick={() => openModal("announcement")}
//                   className="text-white bg-purple-800 px-2 py-1 rounded text-sm"
//                 >
//                   Add
//                 </button>
//               )}
//             </div>
//             {loading.announcements ? (
//               <p className="text-white mt-2">Loading announcements...</p>
//             ) : error.announcements ? (
//               <p className="text-red-300 mt-2">Error: {error.announcements}</p>
//             ) : (
//               <ul className="mt-2 text-white">
//                 {announcements.map((item, index) => (
//                   <li key={index}>{item}</li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           {/* Achievements Section */}
//           <div className="bg-blue-600 mt-6 p-5 rounded-lg shadow-md">
//             <div className="flex justify-between items-center">
//               <h3 className="text-lg font-semibold text-white">🏆 Achievements</h3>
//               {user && (
//                 <button
//                   onClick={() => openModal("achievement")}
//                   className="text-white bg-blue-700 px-2 py-1 rounded text-sm"
//                 >
//                   Add
//                 </button>
//               )}
//             </div>
//             {loading.achievements ? (
//               <p className="text-white mt-2">Loading achievements...</p>
//             ) : error.achievements ? (
//               <p className="text-red-300 mt-2">Error: {error.achievements}</p>
//             ) : (
//               <ul className="mt-2 text-white">
//                 {achievements.map((item, index) => (
//                   <li key={index}>{item}</li>
//                 ))}
//               </ul>
//             )}
//           </div>

//           {/* Explore Events Section */}
//           <div className="bg-green-600 mt-6 p-5 rounded-lg shadow-md cursor-pointer" onClick={handleExploreEvents}>
//             <h3 className="text-lg font-semibold text-white">🌟 Explore Events</h3>
//             <p className="mt-2 text-white">Check out the latest events happening!</p>
//           </div>
//         </div>

//         {/* Main Feed - Center (Posts Section) */}
//         <div className="md:col-span-2">
//           {loading.posts ? (
//             <div className="flex justify-center items-center h-40">
//               <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//             </div>
//           ) : error.posts ? (
//             <div className="bg-red-500 text-white p-4 rounded-lg mb-4">Error loading posts: {error.posts}</div>
//           ) : posts.length === 0 ? (
//             <div className="bg-gray-800 p-5 rounded-lg shadow-md mb-5 text-center">
//               <p className="text-gray-400">No posts yet. Be the first to post!</p>
//             </div>
//           ) : (
//             /* Displaying Posts */
//             posts.map((post) => (
//               <div key={post._id} className="bg-gray-800 p-5 rounded-lg shadow-md mb-5 max-w-[90%] mx-auto">
//                 <div className="flex items-center mb-3">
//                   <div className="w-10 h-10 rounded-full bg-gray-600 mr-3 flex items-center justify-center overflow-hidden">
//                     {post.userId && post.userId.image ? (
//                       <img
//                         src={post.userId.image || "/placeholder.svg"}
//                         alt={post.userId.name || "User"}
//                         className="w-full h-full object-cover"
//                         onError={(e) => {
//                           e.target.onerror = null
//                           e.target.src =
//                             "https://tse1.mm.bing.net/th?id=OIP.MoLuogvKSS_uEhep5nvcuQHaID&pid=Api&P=0&h=180"
//                         }}
//                       />
//                     ) : (
//                       <span className="text-xl">👤</span>
//                     )}
//                   </div>
//                   <div className="flex-1">
//                     <p className="font-semibold text-white">{post.userId?.name || post.username || "User"}</p>
//                     <p className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleString()}</p>
//                   </div>

//                   {user && post.userId && user._id === post.userId._id && (
//                     <button
//                       onClick={() => handleDeletePost(post._id)}
//                       disabled={isDeleting}
//                       className="text-red-400 hover:text-red-500 disabled:opacity-50"
//                     >
//                       🗑️ Delete
//                     </button>
//                   )}
//                 </div>

//                 {post.title && <h3 className="text-lg font-semibold mb-2">{post.title}</h3>}
//                 <p className="text-gray-200 whitespace-pre-line">{post.content}</p>

//                 {/* Display images */}
//                 {post.images && post.images.length > 0 && (
//                   <div className={`mt-3 grid gap-2 ${post.images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
//                     {post.images.map((img, imgIndex) => (
//                       <div key={imgIndex} className="relative">
//                         <img
//                           src={img || "/placeholder.svg"}
//                           alt={`Post image ${imgIndex + 1}`}
//                           className="rounded-lg w-full max-h-96 object-cover"
//                           onError={(e) => {
//                             e.target.onerror = null
//                             e.target.src =
//                               "https://tse1.mm.bing.net/th?id=OIP.MoLuogvKSS_uEhep5nvcuQHaID&pid=Api&P=0&h=180"
//                           }}
//                         />
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* Like, dislike, comment buttons */}
//                 <div className="flex gap-3 mt-4">
//                   <button
//                     onClick={() => handleLikePost(post._id)}
//                     className={`flex items-center gap-1 px-2 py-1 rounded ${
//                       post.likes?.includes(user?._id) ? "bg-green-700 text-white" : "text-green-400"
//                     }`}
//                   >
//                     👍 {post.likes?.length || 0}
//                   </button>

//                   <button
//                     onClick={() => handleDislikePost(post._id)}
//                     className={`flex items-center gap-1 px-2 py-1 rounded ${
//                       post.dislikes?.includes(user?._id) ? "bg-red-700 text-white" : "text-red-400"
//                     }`}
//                   >
//                     👎 {post.dislikes?.length || 0}
//                   </button>

//                   <button
//                     onClick={() =>
//                       setShowComments((prev) => ({
//                         ...prev,
//                         [post._id]: !prev[post._id],
//                       }))
//                     }
//                     className="text-blue-400 flex items-center gap-1"
//                   >
//                     💬 {post.comments?.length || 0} Comments
//                   </button>
//                 </div>

//                 {/* Comments section */}
//                 {showComments[post._id] && (
//                   <div className="mt-4 bg-gray-700 p-3 rounded-lg">
//                     <h4 className="text-gray-300 mb-2 font-medium">Comments</h4>
//                     {post.comments && post.comments.length > 0 ? (
//                       <div className="space-y-2 max-h-60 overflow-y-auto">
//                         {post.comments.map((comment, cIndex) => (
//                           <div key={cIndex} className="bg-gray-800 p-2 rounded">
//                             <div className="flex items-center gap-2 mb-1">
//                               <span className="font-semibold text-sm text-blue-300">{comment.username || "User"}</span>
//                               <span className="text-xs text-gray-400">
//                                 {new Date(comment.createdAt).toLocaleString()}
//                               </span>
//                             </div>
//                             <p className="text-gray-300 text-sm">{comment.text}</p>
//                           </div>
//                         ))}
//                       </div>
//                     ) : (
//                       <p className="text-gray-400 text-sm">No comments yet</p>
//                     )}

//                     {user ? (
//                       <form
//                         className="mt-3"
//                         onSubmit={(e) => {
//                           e.preventDefault()
//                           const form = e.target
//                           const commentInput = form.elements.commentText
//                           handleAddComment(post._id, commentInput.value)
//                           commentInput.value = ""
//                         }}
//                       >
//                         <div className="flex gap-2">
//                           <input
//                             name="commentText"
//                             className="flex-1 bg-gray-900 border border-gray-600 rounded-lg p-2 text-gray-300"
//                             placeholder="Add a comment..."
//                             required
//                           />
//                           <button
//                             type="submit"
//                             className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg"
//                           >
//                             Post
//                           </button>
//                         </div>
//                       </form>
//                     ) : (
//                       <p className="text-red-400 mt-2 text-sm">Log in to comment.</p>
//                     )}
//                   </div>
//                 )}
//               </div>
//             ))
//           )}
//         </div>

//         {/* Right Sidebar - Profile & Create Post Box */}
//         <div className="hidden md:block md:col-span-1">
//           {/* Profile Section */}
//           <div className="bg-[#D8BFD8] p-6 rounded-lg shadow-lg mb-6 text-center">
//             {user ? (
//               <>
//                 <div className="flex justify-center">
//                   <img
//                     src={
//                       user.image || "https://tse1.mm.bing.net/th?id=OIP.MoLuogvKSS_uEhep5nvcuQHaID&pid=Api&P=0&h=180"
//                     }
//                     alt="Profile"
//                     className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md"
//                     onError={(e) => {
//                       e.target.onerror = null
//                       e.target.src = "https://tse1.mm.bing.net/th?id=OIP.MoLuogvKSS_uEhep5nvcuQHaID&pid=Api&P=0&h=180"
//                     }}
//                   />
//                 </div>
//                 <h3 className="text-2xl font-extrabold text-gray-800 mt-4">{user.name}</h3>
//                 <p className="text-gray-700 text-sm font-bold mt-1">
//                   {user.role === "student"
//                     ? `${user.year || ""} year student at ${user.department || "VIT Bhopal University"}`
//                     : user.role === "faculty"
//                       ? `Faculty at ${user.department || "VIT Bhopal University"}`
//                       : `Alumni from ${user.passedOutBatch || ""} batch`}
//                 </p>
//                 <p className="text-gray-600 text-xs font-bold">{user.branch || ""}</p>

//                 {user.skills && user.skills.length > 0 && (
//                   <div className="mt-3 flex flex-wrap justify-center gap-1">
//                     {user.skills.map((skill, idx) => (
//                       <span key={idx} className="bg-purple-200 text-purple-800 text-xs px-2 py-1 rounded-full">
//                         {skill}
//                       </span>
//                     ))}
//                   </div>
//                 )}

//                 <div className="bg-[#E6C6FF] p-4 rounded-lg mt-5 text-sm font-bold shadow-inner">
//                   <div className="flex justify-between text-gray-800">
//                     <span>Profile viewers</span>
//                     <span className="text-purple-900">156</span>
//                   </div>
//                   <div className="flex justify-between text-gray-800 mt-3">
//                     <span>Post impressions</span>
//                     <span className="text-purple-900">311</span>
//                   </div>
//                   {user.linkedin && (
//                     <a
//                       href={user.linkedin}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       className="block mt-3 text-blue-700 hover:underline"
//                     >
//                       LinkedIn Profile
//                     </a>
//                   )}
//                 </div>
//               </>
//             ) : (
//               <p className="text-gray-800 font-bold">Log in to see your profile.</p>
//             )}
//           </div>

//           {/* Create a Post Section */}
//           <div className="bg-gray-800 p-5 rounded-lg shadow-md">
//             <h3 className="text-lg font-semibold text-gray-300">Create a Post</h3>
//             <textarea
//               className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-300 mt-2"
//               placeholder="What's on your mind?"
//               value={postText}
//               onChange={(e) => setPostText(e.target.value)}
//             />

//             {/* Image upload section */}
//             <div className="mt-3">
//               <label className="block text-sm font-medium text-gray-400 mb-1">Add Images (up to 5)</label>
//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 onChange={handleImageUpload}
//                 className="text-gray-400"
//                 disabled={selectedImages.length >= 5}
//               />
//             </div>

//             {/* Selected images preview */}
//             {selectedImages.length > 0 && (
//               <div className="mt-3">
//                 <p className="text-sm text-gray-400 mb-2">Selected images:</p>
//                 <div className="grid grid-cols-2 gap-2">
//                   {selectedImages.map((img, idx) => (
//                     <div key={idx} className="relative">
//                       <img
//                         src={img.url || "/placeholder.svg"}
//                         alt={`Preview ${idx}`}
//                         className="w-full h-24 object-cover rounded-md"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeSelectedImage(idx)}
//                         className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
//                       >
//                         ×
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             <button
//               onClick={createPost}
//               disabled={loading.posts || (!postText.trim() && selectedImages.length === 0)}
//               className={`${
//                 loading.posts || (!postText.trim() && selectedImages.length === 0)
//                   ? "bg-gray-500 cursor-not-allowed"
//                   : "bg-blue-500 hover:bg-blue-600"
//               } text-white px-4 py-2 mt-3 rounded-lg w-full flex items-center justify-center`}
//             >
//               {loading.posts ? (
//                 <>
//                   <span className="animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-white rounded-full"></span>
//                   Posting...
//                 </>
//               ) : (
//                 "Post"
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Modal for adding announcements/achievements */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full">
//             <h3 className="text-xl font-semibold text-white mb-4">
//               Add {modalType === "announcement" ? "Announcement" : "Achievement"}
//             </h3>
//             <textarea
//               className="w-full bg-gray-700 border border-gray-600 rounded-lg p-3 text-gray-300 mb-4"
//               placeholder={`Enter ${modalType === "announcement" ? "announcement" : "achievement"} description...`}
//               value={modalContent}
//               onChange={(e) => setModalContent(e.target.value)}
//               rows={4}
//             />
//             <div className="flex justify-end gap-3">
//               <button onClick={closeModal} className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
//                 Cancel
//               </button>
//               <button onClick={submitModal} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default HomePage

"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "./Navbar"
import { useUser } from "../contexts/UserContext"

const HomePage = () => {
  const [postText, setPostText] = useState("")
  const [postImages, setPostImages] = useState([])
  const [selectedImages, setSelectedImages] = useState([])
  const [posts, setPosts] = useState([])
  const [announcements, setAnnouncements] = useState([])
  const [achievements, setAchievements] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState("")
  const [modalType, setModalType] = useState("") // 'announcement' or 'achievement'
  const [loading, setLoading] = useState({
    posts: false,
    announcements: false,
    achievements: false,
  })
  const [error, setError] = useState({
    posts: null,
    announcements: null,
    achievements: null,
  })

  const { user } = useUser()
  const navigate = useNavigate()
  const [showComments, setShowComments] = useState({})
  const [isDeleting, setIsDeleting] = useState(false)

  // Fetch data from backend on component mount
  useEffect(() => {
    fetchAnnouncements()
    fetchAchievements()
    fetchPosts()
  }, [])

  // Fetch announcements from API
  const fetchAnnouncements = async () => {
    setLoading((prev) => ({ ...prev, announcements: true }))
    setError((prev) => ({ ...prev, announcements: null }))

    try {
      const response = await fetch("http://localhost:5005/api/announcements")
      if (!response.ok) {
        throw new Error(`Failed to fetch announcements: ${response.statusText}`)
      }
      const data = await response.json()
      setAnnouncements(data.map((item) => `📌 ${item.description}`))
    } catch (err) {
      setError((prev) => ({ ...prev, announcements: err.message }))
      console.error("Error fetching announcements:", err)
    } finally {
      setLoading((prev) => ({ ...prev, announcements: false }))
    }
  }

  // Fetch achievements from API
  const fetchAchievements = async () => {
    setLoading((prev) => ({ ...prev, achievements: true }))
    setError((prev) => ({ ...prev, achievements: null }))

    try {
      const response = await fetch("http://localhost:5005/api/achievements")
      if (!response.ok) {
        throw new Error(`Failed to fetch achievements: ${response.statusText}`)
      }
      const data = await response.json()
      setAchievements(data.map((item) => `🎉 ${item.description}`))
    } catch (err) {
      setError((prev) => ({ ...prev, achievements: err.message }))
      console.error("Error fetching achievements:", err)
    } finally {
      setLoading((prev) => ({ ...prev, achievements: false }))
    }
  }

  // Add announcement API call
  const addAnnouncementAPI = async (description) => {
    try {
      const response = await fetch("http://localhost:5005/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      })

      if (!response.ok) {
        throw new Error(`Failed to add announcement: ${response.statusText}`)
      }

      return response.json()
    } catch (error) {
      console.error("Error adding announcement:", error)
      return null
    }
  }

  // Add achievement API call
  const addAchievementAPI = async (description) => {
    try {
      const response = await fetch("http://localhost:5005/api/achievements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      })

      if (!response.ok) {
        throw new Error(`Failed to add achievement: ${response.statusText}`)
      }

      return response.json()
    } catch (error) {
      console.error("Error adding achievement:", error)
      return null
    }
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    // Validate file types and sizes
    const validFiles = files.filter((file) => {
      const isImage = file.type.startsWith("image/")
      const isValidSize = file.size <= 5 * 1024 * 1024 // 5MB limit

      if (!isImage) {
        alert(`File "${file.name}" is not an image.`)
      }
      if (!isValidSize) {
        alert(`File "${file.name}" exceeds 5MB size limit.`)
      }

      return isImage && isValidSize
    })

    setPostImages(validFiles)

    // Create preview URLs for the selected images
    const imagePreviewUrls = validFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }))

    setSelectedImages(imagePreviewUrls)
  }

  const removeSelectedImage = (index) => {
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(selectedImages[index].url)

    // Remove the image from both arrays
    const newSelectedImages = [...selectedImages]
    newSelectedImages.splice(index, 1)
    setSelectedImages(newSelectedImages)

    const newPostImages = [...postImages]
    newPostImages.splice(index, 1)
    setPostImages(newPostImages)
  }

  const handleExploreEvents = () => {
    navigate("/events")
  }

  const openModal = (type) => {
    setModalType(type)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setModalContent("")
  }

  const submitModal = async () => {
    if (!modalContent.trim()) return

    try {
      if (modalType === "announcement") {
        await addAnnouncementAPI(modalContent)
        await fetchAnnouncements()
      } else {
        await addAchievementAPI(modalContent)
        await fetchAchievements()
      }
      closeModal()
    } catch (error) {
      console.error("Error: Submission failed.", error)
    }
  }

  const fetchPosts = async () => {
    setLoading((prev) => ({ ...prev, posts: true }))
    setError((prev) => ({ ...prev, posts: null }))

    try {
      const res = await fetch("http://localhost:5005/api/posts")
      if (!res.ok) {
        throw new Error(`Failed to fetch posts: ${res.statusText}`)
      }
      const data = await res.json()
      setPosts(data)
    } catch (err) {
      setError((prev) => ({ ...prev, posts: err.message }))
      console.error("Error fetching posts:", err)
    } finally {
      setLoading((prev) => ({ ...prev, posts: false }))
    }
  }

  const createPost = async () => {
    if (!postText.trim() && postImages.length === 0) return

    if (!user) {
      alert("Please log in to create a post")
      return
    }

    setLoading((prev) => ({ ...prev, posts: true }))

    const formData = new FormData()
    formData.append("content", postText)
    formData.append("userId", user._id)
    formData.append("username", user.name)

    // Add each image to the formData
    postImages.forEach((img) => {
      formData.append("images", img)
    })

    try {
      console.log("Sending post with content:", postText)
      console.log("Images count:", postImages.length)

      const response = await fetch("http://localhost:5005/api/posts", {
        method: "POST",
        body: formData,
        // Don't set Content-Type header when sending FormData
        // The browser will set it automatically with the correct boundary
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to create post: ${response.status}`)
      }

      const responseData = await response.json()

      // Refresh posts after successful creation
      await fetchPosts()
      setPostText("")
      setPostImages([])
      setSelectedImages([])
    } catch (err) {
      console.error("Error creating post:", err)
      alert("Failed to create post: " + err.message)
    } finally {
      setLoading((prev) => ({ ...prev, posts: false }))
    }
  }

  const handleLikePost = async (postId) => {
    if (!user) {
      alert("Please log in to like posts")
      return
    }

    try {
      const res = await fetch(`http://localhost:5005/api/posts/${postId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id }),
      })

      if (!res.ok) {
        throw new Error("Failed to like post")
      }

      const updatedPost = await res.json()

      // Update the post in the state
      setPosts((prevPosts) => prevPosts.map((post) => (post._id === postId ? updatedPost : post)))
    } catch (err) {
      console.error("Error liking post:", err)
    }
  }

  const handleDislikePost = async (postId) => {
    if (!user) {
      alert("Please log in to dislike posts")
      return
    }

    try {
      const res = await fetch(`http://localhost:5005/api/posts/${postId}/dislike`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id }),
      })

      if (!res.ok) {
        throw new Error("Failed to dislike post")
      }

      const updatedPost = await res.json()

      // Update the post in the state
      setPosts((prevPosts) => prevPosts.map((post) => (post._id === postId ? updatedPost : post)))
    } catch (err) {
      console.error("Error disliking post:", err)
    }
  }

  const handleAddComment = async (postId, text) => {
    if (!user) {
      alert("Please log in to comment")
      return
    }

    if (!text.trim()) return

    try {
      const res = await fetch(`http://localhost:5005/api/posts/${postId}/comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          userId: user._id,
          username: user.name,
        }),
      })

      if (!res.ok) {
        throw new Error("Failed to add comment")
      }

      const updatedPost = await res.json()

      // Update the post in the state
      setPosts((prevPosts) => prevPosts.map((post) => (post._id === postId ? updatedPost : post)))
    } catch (err) {
      console.error("Error adding comment:", err)
    }
  }

  const handleDeletePost = async (postId) => {
    if (!user) return

    if (!window.confirm("Are you sure you want to delete this post?")) {
      return
    }

    setIsDeleting(true)

    try {
      const res = await fetch(`http://localhost:5005/api/posts/${postId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user._id }),
      })

      if (!res.ok) {
        const errorData = await res.json()
        throw new Error(errorData.error || "Failed to delete post")
      }

      // Remove the post from state
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId))
    } catch (err) {
      console.error("Error deleting post:", err)
      alert("Failed to delete post: " + err.message)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Navbar />
      <div className="container mx-auto py-8 px-4 grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Sidebar - Announcements & Achievements */}
        <div className="hidden md:block md:col-span-1">
          {/* Announcements Section */}
          <div className="bg-indigo-700 p-5 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">📢 Announcements</h3>
              {user && (
                <button
                  onClick={() => openModal("announcement")}
                  className="text-white bg-indigo-800 hover:bg-indigo-900 px-2 py-1 rounded text-sm transition-colors"
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
                  <li key={index} className="py-1">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Achievements Section */}
          <div className="bg-purple-700 mt-6 p-5 rounded-lg shadow-md">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">🏆 Achievements</h3>
              {user && (
                <button
                  onClick={() => openModal("achievement")}
                  className="text-white bg-purple-800 hover:bg-purple-900 px-2 py-1 rounded text-sm transition-colors"
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
                  <li key={index} className="py-1">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Explore Events Section */}
          <div
            className="bg-indigo-600 mt-6 p-5 rounded-lg shadow-md cursor-pointer hover:bg-indigo-700 transition-colors"
            onClick={handleExploreEvents}
          >
            <h3 className="text-lg font-semibold text-white">🌟 Explore Events</h3>
            <p className="mt-2 text-white">Check out the latest events happening!</p>
          </div>
        </div>

        {/* Main Feed - Center (Posts Section) */}
        <div className="md:col-span-2">
          {loading.posts ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-300"></div>
            </div>
          ) : error.posts ? (
            <div className="bg-red-500 text-white p-4 rounded-lg mb-4">Error loading posts: {error.posts}</div>
          ) : posts.length === 0 ? (
            <div className="bg-indigo-800 p-5 rounded-lg shadow-md mb-5 text-center">
              <p className="text-indigo-200">No posts yet. Be the first to post!</p>
            </div>
          ) : (
            /* Displaying Posts */
            posts.map((post) => (
              <div
                key={post._id}
                className="bg-gray-800 p-5 rounded-lg shadow-md mb-5 max-w-[90%] mx-auto hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center mb-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 mr-3 flex items-center justify-center overflow-hidden">
                    {post.userId && post.userId.image ? (
                      <img
                        src={post.userId.image || "/placeholder.svg"}
                        alt={post.userId.name || "User"}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.onerror = null
                          e.target.src =
                            "https://tse1.mm.bing.net/th?id=OIP.MoLuogvKSS_uEhep5nvcuQHaID&pid=Api&P=0&h=180"
                        }}
                      />
                    ) : (
                      <span className="text-xl">👤</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-white">{post.userId?.name || post.username || "User"}</p>
                    <p className="text-xs text-indigo-300">{new Date(post.createdAt).toLocaleString()}</p>
                  </div>

                  {user && post.userId && user._id === post.userId._id && (
                    <button
                      onClick={() => handleDeletePost(post._id)}
                      disabled={isDeleting}
                      className="text-red-300 hover:text-red-400 disabled:opacity-50 transition-colors"
                    >
                      🗑️ Delete
                    </button>
                  )}
                </div>

                {post.title && <h3 className="text-lg font-semibold mb-2">{post.title}</h3>}
                <p className="text-indigo-100 whitespace-pre-line">{post.content}</p>

                {/* Display images */}
                {post.images && post.images.length > 0 && (
                  <div className={`mt-3 grid gap-2 ${post.images.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                    {post.images.map((img, imgIndex) => (
                      <div key={imgIndex} className="relative">
                        <img
                          src={img || "/placeholder.svg"}
                          alt={`Post image ${imgIndex + 1}`}
                          className="rounded-lg w-full max-h-96 object-cover"
                          onError={(e) => {
                            e.target.onerror = null
                            e.target.src =
                              "https://tse1.mm.bing.net/th?id=OIP.MoLuogvKSS_uEhep5nvcuQHaID&pid=Api&P=0&h=180"
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* Like, dislike, comment buttons */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleLikePost(post._id)}
                    className={`flex items-center gap-1 px-2 py-1 rounded ${
                      post.likes?.includes(user?._id)
                        ? "bg-indigo-500 text-white"
                        : "text-indigo-300 hover:text-indigo-200"
                    } transition-colors`}
                  >
                    👍 {post.likes?.length || 0}
                  </button>

                  <button
                    onClick={() => handleDislikePost(post._id)}
                    className={`flex items-center gap-1 px-2 py-1 rounded ${
                      post.dislikes?.includes(user?._id) ? "bg-red-600 text-white" : "text-red-300 hover:text-red-200"
                    } transition-colors`}
                  >
                    👎 {post.dislikes?.length || 0}
                  </button>

                  <button
                    onClick={() =>
                      setShowComments((prev) => ({
                        ...prev,
                        [post._id]: !prev[post._id],
                      }))
                    }
                    className="text-indigo-300 hover:text-indigo-200 flex items-center gap-1 transition-colors"
                  >
                    💬 {post.comments?.length || 0} Comments
                  </button>
                </div>

                {/* Comments section */}
                {showComments[post._id] && (
                  <div className="mt-4 bg-black p-3 rounded-lg">
                    <h4 className="text-white mb-2 font-medium">Comments</h4>
                    {post.comments && post.comments.length > 0 ? (
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {post.comments.map((comment, cIndex) => (
                          <div key={cIndex} className="bg-indigo-500 p-2 rounded">
                            <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold text-sm text-white">

                                {comment.username || "User"}
                              </span>
                              <span className="text-xs text-indigo-100">
                                {new Date(comment.createdAt).toLocaleString()}
                              </span>
                            </div>
                            <p className="text-black text-sm font-medium">{comment.text}</p>

                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-indigo-300 text-sm">No comments yet</p>
                    )}

                    {user ? (
                      <form
                        className="mt-3"
                        onSubmit={(e) => {
                          e.preventDefault()
                          const form = e.target
                          const commentInput = form.elements.commentText
                          handleAddComment(post._id, commentInput.value)
                          commentInput.value = ""
                        }}
                      >
                        <div className="flex gap-2">
                          <input
                            name="commentText"
                            className="flex-1 bg-indigo-900 border border-indigo-600 rounded-lg p-2 text-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            placeholder="Add a comment..."
                            required
                          />
                          <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg transition-colors"
                          >
                            Post
                          </button>
                        </div>
                      </form>
                    ) : (
                      <p className="text-red-300 mt-2 text-sm">Log in to comment.</p>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Right Sidebar - Profile & Create Post Box */}
        <div className="hidden md:block md:col-span-1">
          {/* Profile Section */}
          <div className="bg-gradient-to-br from-indigo-100 to-purple-100 p-6 rounded-lg shadow-lg mb-6 text-center">
            {user ? (
              <>
                <div className="flex justify-center">
                  <img
                    src={
                      user.image || "https://tse1.mm.bing.net/th?id=OIP.MoLuogvKSS_uEhep5nvcuQHaID&pid=Api&P=0&h=180"
                    }
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-indigo-300 shadow-md"
                    onError={(e) => {
                      e.target.onerror = null
                      e.target.src = "https://tse1.mm.bing.net/th?id=OIP.MoLuogvKSS_uEhep5nvcuQHaID&pid=Api&P=0&h=180"
                    }}
                  />
                </div>
                <h3 className="text-2xl font-extrabold text-indigo-900 mt-4">{user.name}</h3>
                <p className="text-indigo-700 text-sm font-bold mt-1">
                  {user.role === "student"
                    ? `${user.year || ""} year student at ${user.department || "VIT Bhopal University"}`
                    : user.role === "faculty"
                      ? `Faculty at ${user.department || "VIT Bhopal University"}`
                      : `Alumni from ${user.passedOutBatch || ""} batch`}
                </p>
                <p className="text-indigo-600 text-xs font-bold">{user.branch || ""}</p>

                {user.skills && user.skills.length > 0 && (
                  <div className="mt-3 flex flex-wrap justify-center gap-1">
                    {user.skills.map((skill, idx) => (
                      <span key={idx} className="bg-indigo-200 text-indigo-800 text-xs px-2 py-1 rounded-full">
                        {skill}
                      </span>
                    ))}
                  </div>
                )}

                <div className="bg-indigo-50 p-4 rounded-lg mt-5 text-sm font-bold shadow-inner">
                  <div className="flex justify-between text-indigo-800">
                    <span>Profile viewers</span>
                    <span className="text-indigo-900">156</span>
                  </div>
                  <div className="flex justify-between text-indigo-800 mt-3">
                    <span>Post impressions</span>
                    <span className="text-indigo-900">311</span>
                  </div>
                  {user.linkedin && (
                    <a
                      href={user.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block mt-3 text-indigo-700 hover:underline"
                    >
                      LinkedIn Profile
                    </a>
                  )}
                </div>
              </>
            ) : (
              <p className="text-indigo-800 font-bold">Log in to see your profile.</p>
            )}
          </div>

          {/* Create a Post Section */}
          <div className="bg-indigo-800 p-5 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-indigo-100">Create a Post</h3>
            <textarea
              className="w-full bg-indigo-700 border border-indigo-600 rounded-lg p-3 text-indigo-100 mt-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="What's on your mind?"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
            />

            {/* Image upload section */}
            <div className="mt-3">
              <label className="block text-sm font-medium text-indigo-300 mb-1">Add Images (up to 5)</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="text-indigo-300"
                disabled={selectedImages.length >= 5}
              />
            </div>

            {/* Selected images preview */}
            {selectedImages.length > 0 && (
              <div className="mt-3">
                <p className="text-sm text-indigo-300 mb-2">Selected images:</p>
                <div className="grid grid-cols-2 gap-2">
                  {selectedImages.map((img, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={img.url || "/placeholder.svg"}
                        alt={`Preview ${idx}`}
                        className="w-full h-24 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeSelectedImage(idx)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={createPost}
              disabled={loading.posts || (!postText.trim() && selectedImages.length === 0)}
              className={`${
                loading.posts || (!postText.trim() && selectedImages.length === 0)
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-indigo-500 hover:bg-indigo-600"
              } text-white px-4 py-2 mt-3 rounded-lg w-full flex items-center justify-center transition-colors`}
            >
              {loading.posts ? (
                <>
                  <span className="animate-spin h-4 w-4 mr-2 border-t-2 border-b-2 border-white rounded-full"></span>
                  Posting...
                </>
              ) : (
                "Post"
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Modal for adding announcements/achievements */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-indigo-800 p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-semibold text-white mb-4">
              Add {modalType === "announcement" ? "Announcement" : "Achievement"}
            </h3>
            <textarea
              className="w-full bg-indigo-700 border border-indigo-600 rounded-lg p-3 text-indigo-100 mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder={`Enter ${modalType === "announcement" ? "announcement" : "achievement"} description...`}
              value={modalContent}
              onChange={(e) => setModalContent(e.target.value)}
              rows={4}
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={closeModal}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={submitModal}
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default HomePage

