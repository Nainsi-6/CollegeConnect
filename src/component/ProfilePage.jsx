"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import StudentProfile from "./StudentProfile"
import FacultyProfile from "./FacultyProfile"
import AlumniProfile from "./AlumniProfile"
import { useUser } from "../contexts/UserContext"

const ProfilePage = () => {
  const [userRole, setUserRole] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const { user } = useUser() // Get user from context

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // First check if we already have the user in context
        if (user && user.role) {
          setUserRole(user.role.toLowerCase())
          setLoading(false)
          return
        }

        // If not in context, try to get from token
        const token = localStorage.getItem("token")
        if (!token) {
          navigate("/login")
          return
        }

        // Fetch user profile from backend
        const response = await axios.get("http://localhost:5005/api/profiles/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        if (response.data && response.data.profile && response.data.profile.role) {
          setUserRole(response.data.profile.role.toLowerCase())
        } else {
          throw new Error("Role not found in profile")
        }
      } catch (error) {
        console.error("Error fetching user data:", error)

        // Only redirect if the error is authentication related
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("token")
          navigate("/login")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [navigate, user])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-2">Loading profile...</p>
      </div>
    )
  }

  switch (userRole) {
    case "student":
      return <StudentProfile />
    case "faculty":
      return <FacultyProfile />
    case "alumni":
      return <AlumniProfile />
    default:
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-xl text-red-500">Profile not available or role unknown.</p>
          <button onClick={() => navigate("/login")} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
            Back to Login
          </button>
        </div>
      )
  }
}

export default ProfilePage
