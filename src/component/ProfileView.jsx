"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { useUser } from "../contexts/UserContext"
import Navbar from "./Navbar"

const ProfileView = () => {
  const { userId } = useParams()
  const { user: currentUser } = useUser()
  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [connectionStatus, setConnectionStatus] = useState("none")
  const [connectionId, setConnectionId] = useState(null)
  const [activeTab, setActiveTab] = useState("about")

  useEffect(() => {
    const fetchProfileAndConnection = async () => {
      try {
        setIsLoading(true)

        // Fetch profile
        const profileResponse = await fetch(`http://localhost:5005/api/profiles/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })

        if (!profileResponse.ok) {
          throw new Error("Failed to fetch profile")
        }

        const profileData = await profileResponse.json()
        setProfile(profileData.profile)

        // Fetch connection status if not viewing own profile
        if (userId !== currentUser?._id) {
          const connectionsResponse = await fetch("http://localhost:5005/api/users/connections", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })

          if (!connectionsResponse.ok) {
            throw new Error("Failed to fetch connections")
          }

          const connectionsData = await connectionsResponse.json()
          const connection = connectionsData.connections.find((c) => c.requester === userId || c.recipient === userId)

          if (!connection) {
            setConnectionStatus("none")
          } else if (connection.status === "pending") {
            setConnectionStatus("pending")
            setConnectionId(connection._id)
          } else if (connection.status === "accepted") {
            setConnectionStatus("connected")
            setConnectionId(connection._id)
          }
        }

        setIsLoading(false)
      } catch (err) {
        console.error("Error fetching profile:", err)
        setError(err.message)
        setIsLoading(false)
      }
    }

    if (userId) {
      fetchProfileAndConnection()
    }
  }, [userId, currentUser])

  const handleConnect = async () => {
    try {
      const response = await fetch(`http://localhost:5005/api/users/connect/${userId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to connect with user")
      }

      const data = await response.json()
      setConnectionStatus("pending")
      setConnectionId(data.connection._id)
    } catch (err) {
      console.error("Error connecting with user:", err)
      alert(`Failed to send connection request: ${err.message}`)
    }
  }

  const handleCancelRequest = async () => {
    if (!connectionId) return

    try {
      const response = await fetch(`http://localhost:5005/api/users/connections/${connectionId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to cancel connection request")
      }

      setConnectionStatus("none")
      setConnectionId(null)
    } catch (err) {
      console.error("Error canceling connection request:", err)
      alert(`Failed to cancel connection request: ${err.message}`)
    }
  }

  const handleAcceptRequest = async () => {
    if (!connectionId) return

    try {
      const response = await fetch(`http://localhost:5005/api/users/connections/${connectionId}/accept`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to accept connection request")
      }

      setConnectionStatus("connected")
    } catch (err) {
      console.error("Error accepting connection request:", err)
      alert(`Failed to accept connection request: ${err.message}`)
    }
  }

  if (isLoading) {
    return (
      <>
        <Navbar />
        <div className="container mx-auto p-4 max-w-4xl">
          <div className="bg-gray-100 h-48 rounded-t-lg relative">
            <div className="absolute -bottom-16 left-8 w-32 h-32 bg-gray-300 rounded-full border-4 border-white animate-pulse"></div>
          </div>
          <div className="pt-20 px-8">
            <div className="h-8 bg-gray-300 w-1/3 mb-2 animate-pulse rounded"></div>
            <div className="h-4 bg-gray-200 w-1/4 mb-6 animate-pulse rounded"></div>
            <div className="flex gap-4 mb-8">
              <div className="h-10 bg-gray-200 w-32 animate-pulse rounded"></div>
              <div className="h-10 bg-gray-200 w-32 animate-pulse rounded"></div>
            </div>
            <div className="h-4 bg-gray-200 w-full mb-2 animate-pulse rounded"></div>
            <div className="h-4 bg-gray-200 w-full mb-2 animate-pulse rounded"></div>
            <div className="h-4 bg-gray-200 w-2/3 animate-pulse rounded"></div>
          </div>
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        </div>
      </>
    )
  }

  if (!profile) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
            <p className="font-bold">Profile Not Found</p>
            <p>The requested profile could not be found.</p>
          </div>
        </div>
      </>
    )
  }

  const isOwnProfile = userId === currentUser?._id

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 max-w-4xl">
        {/* Cover Photo and Profile Photo */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-48 rounded-t-lg relative">
          {profile.coverPhotoUrl && (
            <img
              src={`http://localhost:5005${profile.coverPhotoUrl}`}
              alt="Cover"
              className="w-full h-full object-cover rounded-t-lg"
            />
          )}

          {/* Role badge */}
          <div className="absolute top-4 right-4 bg-white text-blue-600 text-xs px-2 py-1 rounded-full">
            {profile.role === "student" && (
              <>
                <i className="fas fa-graduation-cap mr-1"></i> Student
              </>
            )}
            {profile.role === "faculty" && (
              <>
                <i className="fas fa-building mr-1"></i> Faculty
              </>
            )}
            {profile.role === "alumni" && (
              <>
                <i className="fas fa-briefcase mr-1"></i> Alumni
              </>
            )}
          </div>

          {/* Profile photo */}
          <div className="absolute -bottom-16 left-8">
            <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-white text-4xl font-bold border-4 border-white overflow-hidden">
              {profile.profilePhotoUrl ? (
                <img
                  src={`http://localhost:5005${profile.profilePhotoUrl}`}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-blue-600">{profile.name.charAt(0).toUpperCase()}</span>
              )}
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="bg-white rounded-b-lg shadow-md pt-20 px-8 pb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold">{profile.name}</h1>
              <p className="text-gray-600 flex items-center mt-1">
                <i className="fas fa-envelope mr-2"></i>
                {profile.email}
              </p>
            </div>

            <div className="mt-4 md:mt-0 flex gap-2">
              {!isOwnProfile && (
                <>
                  {connectionStatus === "none" && (
                    <button
                      onClick={handleConnect}
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center gap-2"
                    >
                      <i className="fas fa-user-plus"></i>
                      Connect
                    </button>
                  )}

                  {connectionStatus === "pending" && (
                    <button
                      onClick={handleCancelRequest}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition-colors flex items-center gap-2"
                    >
                      Cancel Request
                    </button>
                  )}

                  {connectionStatus === "connected" && (
                    <button
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded cursor-not-allowed flex items-center gap-2"
                      disabled
                    >
                      <i className="fas fa-user-check"></i>
                      Connected
                    </button>
                  )}

                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition-colors flex items-center gap-2">
                    <i className="fas fa-comment"></i>
                    Message
                  </button>
                </>
              )}

              {isOwnProfile && (
                <Link
                  to="/edit-profile"
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-100 transition-colors"
                >
                  Edit Profile
                </Link>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-[120px] border rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{profile.stats?.followers || 0}</p>
              <p className="text-gray-500">Followers</p>
            </div>

            <div className="flex-1 min-w-[120px] border rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{profile.stats?.following || 0}</p>
              <p className="text-gray-500">Following</p>
            </div>

            <div className="flex-1 min-w-[120px] border rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{profile.stats?.posts || 0}</p>
              <p className="text-gray-500">Posts</p>
            </div>
          </div>

          <div className="border-b mb-4">
            <div className="flex">
              <button
                className={`px-4 py-2 font-medium ${activeTab === "about" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                onClick={() => setActiveTab("about")}
              >
                About
              </button>
              <button
                className={`px-4 py-2 font-medium ${activeTab === "skills" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                onClick={() => setActiveTab("skills")}
              >
                Skills
              </button>
              <button
                className={`px-4 py-2 font-medium ${activeTab === "posts" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
                onClick={() => setActiveTab("posts")}
              >
                Posts
              </button>
            </div>
          </div>

          {activeTab === "about" && (
            <div className="space-y-4">
              {profile.about && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">About</h3>
                  <p className="text-gray-700">{profile.about}</p>
                </div>
              )}

              {/* Role-specific details */}
              {profile.role === "student" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.branch && (
                    <div className="flex items-start gap-2">
                      <i className="fas fa-book text-blue-500 mt-1"></i>
                      <div>
                        <p className="font-medium">Branch</p>
                        <p className="text-gray-600">{profile.branch}</p>
                      </div>
                    </div>
                  )}

                  {profile.yearOfStudy && (
                    <div className="flex items-start gap-2">
                      <i className="fas fa-calendar text-blue-500 mt-1"></i>
                      <div>
                        <p className="font-medium">Year of Study</p>
                        <p className="text-gray-600">{profile.yearOfStudy}</p>
                      </div>
                    </div>
                  )}

                  {profile.batch && (
                    <div className="flex items-start gap-2">
                      <i className="fas fa-users text-blue-500 mt-1"></i>
                      <div>
                        <p className="font-medium">Batch</p>
                        <p className="text-gray-600">{profile.batch}</p>
                      </div>
                    </div>
                  )}

                  {profile.regNumber && (
                    <div className="flex items-start gap-2">
                      <i className="fas fa-id-card text-blue-500 mt-1"></i>
                      <div>
                        <p className="font-medium">Registration Number</p>
                        <p className="text-gray-600">{profile.regNumber}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {profile.role === "faculty" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.department && (
                    <div className="flex items-start gap-2">
                      <i className="fas fa-building text-blue-500 mt-1"></i>
                      <div>
                        <p className="font-medium">Department</p>
                        <p className="text-gray-600">{profile.department}</p>
                      </div>
                    </div>
                  )}

                  {profile.designation && (
                    <div className="flex items-start gap-2">
                      <i className="fas fa-award text-blue-500 mt-1"></i>
                      <div>
                        <p className="font-medium">Designation</p>
                        <p className="text-gray-600">{profile.designation}</p>
                      </div>
                    </div>
                  )}

                  {profile.facultyId && (
                    <div className="flex items-start gap-2">
                      <i className="fas fa-id-badge text-blue-500 mt-1"></i>
                      <div>
                        <p className="font-medium">Faculty ID</p>
                        <p className="text-gray-600">{profile.facultyId}</p>
                      </div>
                    </div>
                  )}

                  {profile.researchInterests && profile.researchInterests.length > 0 && (
                    <div className="flex items-start gap-2 col-span-2">
                      <i className="fas fa-microscope text-blue-500 mt-1"></i>
                      <div>
                        <p className="font-medium">Research Interests</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {profile.researchInterests.map((interest, index) => (
                            <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {profile.role === "alumni" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.currentJobTitle && (
                    <div className="flex items-start gap-2">
                      <i className="fas fa-briefcase text-blue-500 mt-1"></i>
                      <div>
                        <p className="font-medium">Current Job</p>
                        <p className="text-gray-600">{profile.currentJobTitle}</p>
                      </div>
                    </div>
                  )}

                  {profile.company && (
                    <div className="flex items-start gap-2">
                      <i className="fas fa-building text-blue-500 mt-1"></i>
                      <div>
                        <p className="font-medium">Company</p>
                        <p className="text-gray-600">{profile.company}</p>
                      </div>
                    </div>
                  )}

                  {profile.graduationYear && (
                    <div className="flex items-start gap-2">
                      <i className="fas fa-graduation-cap text-blue-500 mt-1"></i>
                      <div>
                        <p className="font-medium">Graduation Year</p>
                        <p className="text-gray-600">{profile.graduationYear}</p>
                      </div>
                    </div>
                  )}

                  {profile.linkedinProfile && (
                    <div className="flex items-start gap-2">
                      <i className="fab fa-linkedin text-blue-500 mt-1"></i>
                      <div>
                        <p className="font-medium">LinkedIn</p>
                        <a
                          href={profile.linkedinProfile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Profile
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === "skills" && (
            <div>
              {profile.skills && profile.skills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
                    <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No skills listed yet.</p>
              )}
            </div>
          )}

          {activeTab === "posts" && (
            <div className="text-center py-8">
              <p className="text-gray-500">Posts will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ProfileView


