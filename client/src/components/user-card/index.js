import Avatar from '@components/avatar'
import React from 'react'

const UserCard = ({ user, border }) => {
  return (
    <div className={`${border ? 'border-2 border-indigo-400' : ''} flex items-center p-2 bg-white`}>
      <Avatar src={user?.avatar} className="w-8 h-8 rounded-full" />
      <div className="flex flex-col ml-2">
        <span>{user.username}</span>
        <small>{user.fullname}</small>
      </div>
    </div>
  )
}

export default UserCard
