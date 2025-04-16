"use client"

const ConnectionRequest = ({ request, onAccept, onReject }) => {
  const { follower } = request

  // Format role for display
  const formatRole = (role) => {
    return role.charAt(0).toUpperCase() + role.slice(1)
  }

  return (
    <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
      <div className="flex items-center space-x-3">
        {/* Profile Image */}
        <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-200">
          <img
            src={follower.profilePhotoUrl || "/default-profile.jpg"}
            alt={`${follower.name}'s profile`}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null
              e.target.src = "/default-profile.jpg"
            }}
          />
        </div>

        {/* User Info */}
        <div>
          <h3 className="font-medium text-gray-800">{follower.name}</h3>
          <p className="text-sm text-gray-600">{formatRole(follower.role)}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={onAccept}
          className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors"
        >
          Accept
        </button>
        <button
          onClick={onReject}
          className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
        >
          Ignore
        </button>
      </div>
    </div>
  )
}

export default ConnectionRequest
