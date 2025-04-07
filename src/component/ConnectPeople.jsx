"use client"

import { useState, useEffect } from "react"
import Navbar from "./Navbar"
import ViewProfile from "./ViewProfile"

const dummyUsers = [
  {
    _id: "1",
    name: "John Doe",
    role: "Student",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    skills: ["JavaScript", "React", "Node.js"],
  },
  {
    _id: "2",
    name: "Jane Smith",
    role: "Faculty",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    school: "VIT Bhopal",
  },
  {
    _id: "3",
    name: "Alice Johnson",
    role: "Alumni",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    company: "Google",
  },
  {
    _id: "4",
    name: "Bob Brown",
    role: "Student",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    skills: ["HTML", "CSS", "JavaScript"],
  },
]

const ConnectPeople = () => {
  const [users, setUsers] = useState(dummyUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [connectionRequests, setConnectionRequests] = useState([dummyUsers[0], dummyUsers[2]]) // Example requests

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSearchResults([])
    } else {
      setSearchResults(users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase())))
    }
  }, [searchTerm, users])

  const handleAcceptRequest = (userId) => {
    setConnectionRequests((prevRequests) => prevRequests.filter((user) => user._id !== userId))
  }

  const handleIgnoreRequest = (userId) => {
    setConnectionRequests((prevRequests) => prevRequests.filter((user) => user._id !== userId))
  }

  return (
    <div className="min-h-screen bg-gray-500 text-gray-900">
      <Navbar />
      <div className="max-w-5xl mx-auto py-10 px-6">
        <h2 className="text-3xl font-bold mb-6 text-indigo-900">Find & Connect with People</h2>
        <input
          type="text"
          placeholder="Search users..."
          className="w-full p-3 border rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {connectionRequests.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-md mt-6">
            <h3 className="text-xl font-bold text-indigo-700">Connection Requests</h3>
            {connectionRequests.map((user) => (
              <div key={user._id} className="flex items-center p-3 bg-indigo-50 rounded-lg shadow-sm mt-2">
                <img
                  src={user.image || "/placeholder.svg"}
                  alt={user.name}
                  className="w-12 h-12 rounded-full border-2 border-indigo-400"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-indigo-900">{user.name}</h4>
                  <p className="text-indigo-600 text-sm">{user.role}</p>
                </div>
                <div className="ml-auto space-x-2">
                  <button
                    className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                    onClick={() => handleAcceptRequest(user._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
                    onClick={() => handleIgnoreRequest(user._id)}
                  >
                    Ignore
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {searchResults.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-md mt-6">
            <h3 className="text-xl font-medium text-indigo-700">Search Results</h3>
            {searchResults.map((user) => (
              <div
                key={user._id}
                className="flex items-center p-3 bg-indigo-50 rounded-lg shadow-sm mt-2 cursor-pointer"
              >
                <img
                  src={user.image || "/placeholder.svg"}
                  alt={user.name}
                  className="w-12 h-12 rounded-full border-2 border-indigo-400"
                />
                <div className="ml-4">
                  <h4 className="font-semibold text-indigo-900">{user.name}</h4>
                  <p className="text-indigo-600 text-sm">{user.role}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        <h3 className="text-2xl font-bold mt-8 mb-4 text-indigo-900">People You May Know</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user._id}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center hover:shadow-xl transition-shadow"
            >
              <img
                src={user.image || "/placeholder.svg"}
                alt={user.name}
                className="w-24 h-24 rounded-full border-2 border-indigo-400 mb-4"
              />
              <h4 className="text-lg font-semibold text-indigo-900">{user.name}</h4>
              <p className="text-indigo-600 text-sm">{user.role}</p>
              {user.role === "Student" && (
                <p className="text-gray-600 text-xs mt-1">Skills: {user.skills?.join(", ")}</p>
              )}
              {user.role === "Faculty" && <p className="text-gray-600 text-xs mt-1">School: {user.school}</p>}
              {user.role === "Alumni" && <p className="text-gray-600 text-xs mt-1">Company: {user.company}</p>}
              <button className="mt-4 px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                Follow
              </button>
            </div>
          ))}
        </div>
        {selectedUser && <ViewProfile user={selectedUser} onClose={() => setSelectedUser(null)} />}
      </div>
    </div>
  )
}

export default ConnectPeople


