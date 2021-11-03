import UserCard from '@components/user-card'
import { XIcon } from '@heroicons/react/outline'
import React from 'react'
import { useSelector } from 'react-redux'
import Follow from '../follow'

const Followers = ({ users, setShowFollowers }) => {
  const { auth } = useSelector((state) => state)
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-screen bg-white bg-opacity-80">
      <div className="w-[350px] h-[400px] border-2 border-gray-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-auto p-5">
        {' '}
        <h5 className="p-2 text-lg font-semibold text-gray-900 truncate">Followers</h5>
        {users.map((user) => (
          <UserCard key={user._id} user={user} setShowFollowers={setShowFollowers}>
            {auth.user._id !== user._id && <Follow user={user} />}
          </UserCard>
        ))}
        <div
          className="absolute flex items-center pr-3 cursor-pointer top-4 right-2"
          onClick={() => setShowFollowers(false)}
        >
          <XIcon className="w-6 h-6 text-indigo-400" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
}

export default Followers
