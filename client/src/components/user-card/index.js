import Avatar from '@components/avatar'
import React from 'react'
import Link from 'next/link'

const UserCard = ({ children, user, border, handleClose, setShowFollowers, setShowFollowing }) => {
  console.log(user)
  const handleCloseAll = () => {
    if (handleClose) handleClose()
    if (setShowFollowers) setShowFollowers(false)
    if (setShowFollowing) setShowFollowing(false)
  }
  return (
    <div
      className={`${border ? 'border-2 border-indigo-400' : ''} flex justify-between items-center p-2 bg-white`}
      onClick={handleCloseAll}
    >
      <Link key={user._id} href={`/profile/${user._id}`}>
        <a>
          <div className="flex items-center">
            <Avatar src={user?.avatar} className="w-8 h-8 rounded-full" />

            <div className="flex flex-col ml-2 font-medium text-gray-500">
              <span>{user.username}</span>
              <small>{user.fullname}</small>
            </div>
          </div>
        </a>
      </Link>

      {children}
    </div>
  )
}

export default UserCard
