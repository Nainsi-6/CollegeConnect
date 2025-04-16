"use client"
import { useState } from "react"
import { Link } from "react-router-dom"

const UserCard = ({ user, onFollow, isFollowing = false }) => {
  const [followState, setFollowState] = useState(isFollowing ? "Following" : "Connect")
  
  const getRoleBadgeColor = (role) => {
    switch (role) {
      case "student":
        return "bg-blue-200 text-blue-900"
      case "faculty":
        return "bg-purple-200 text-purple-900"
      case "alumni":
        return "bg-green-200 text-green-900"
      default:
        return "bg-gray-300 text-gray-700"
    }
  }

  const formatRole = (role) => {
    return role.charAt(0).toUpperCase() + role.slice(1)
  }

  const getAdditionalInfo = (user) => {
    switch (user.role) {
      case "student":
        return user.batch ? `Batch: ${user.batch}` : ""
      case "faculty":
        return user.department ? `Dept: ${user.department}` : ""
      case "alumni":
        return user.company ? `Company: ${user.company}` : ""
      default:
        return ""
    }
  }
  
  const handleFollow = () => {
    if (followState === "Connect") {
      setFollowState("Requested")
      onFollow(user._id)
    }
  }

  return (
    <div className="bg-gray-400 rounded-2xl shadow-lg overflow-hidden transition-transform hover:shadow-xl hover:-translate-y-1 duration-200">
      <div className="p-5 flex flex-col items-center">
        {/* Profile Image */}
        <div className="w-24 h-24 rounded-full overflow-hidden border border-gray-300 mb-4 shadow-sm">
          <img
            src={user.profilePhotoUrl || "https://tse1.mm.bing.net/th?id=OIP.4j4jNaPU3bIzDJHBj6HDSwHaHa&pid=Api&rs=1&c=1&qlt=95&w=120&h=120"}
            alt={`${user.name}'s profile`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null
              e.target.src = "https://tse1.mm.bing.net/th?id=OIP.4j4jNaPU3bIzDJHBj6HDSwHaHa&pid=Api&rs=1&c=1&qlt=95&w=120&h=120"
            }}
          />
        </div>

        {/* User Info */}
        <h3 className="font-semibold text-xl text-gray-800">{user.name}</h3>

        {/* Role Badge */}
        <span className={`mt-1 px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${getRoleBadgeColor(user.role)}`}>
          {formatRole(user.role)}
        </span>

        {/* Additional Info */}
        <p className="text-gray-900 text-sm mt-2 italic">{getAdditionalInfo(user)}</p>

        {/* Actions */}
        <div className="mt-5 flex space-x-3 w-full">
          <Link
            to={`/profile/${user._id}`}
            className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-lg text-sm font-medium text-center hover:bg-gray-400 transition"
          >
            View Profile
          </Link>
          <button
            onClick={handleFollow}
            className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition ${
              followState === "Following" 
                ? "bg-green-500 text-white hover:bg-green-600" 
                : followState === "Requested"
                ? "bg-yellow-500 text-white hover:bg-yellow-600"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            {followState}
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserCard
