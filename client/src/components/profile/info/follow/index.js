import { follow, unfollow } from '@context/store/actions/profileAction'
import { UserAddIcon, UserRemoveIcon } from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Follow = ({ user }) => {
  const [followed, setFollowed] = useState(false)
  const [load, setLoad] = useState(false)

  const { auth, profile } = useSelector((state) => state)

  const dispatch = useDispatch()

  const handleFollow = async () => {
    if (load) return
    setFollowed(true)
    setLoad(true)
    await dispatch(follow({ users: profile.users, user, auth }))
    setLoad(false)
  }
  const handleUnFollow = async () => {
    if (load) return
    setFollowed(false)

    setLoad(true)
    await dispatch(unfollow({ users: profile.users, user, auth }))
    setFollowed(false)
  }

  useEffect(() => {
    if (auth.user.following.find((item) => item._id === user._id)) {
      setFollowed(true)
    }
  }, [auth.user.following])
  return (
    <>
      {followed ? (
        <button
          type="button"
          className="inline-flex justify-center px-4 py-2 ml-5 text-sm font-medium text-white bg-indigo-700 border border-transparent rounded-md shadow-sm hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleUnFollow}
        >
          <UserRemoveIcon className="w-5 h-5 mr-2 -ml-1 text-white" aria-hidden="true" />
          <span>Unfollow</span>
        </button>
      ) : (
        <button
          type="button"
          className="inline-flex justify-center px-4 py-2 ml-5 text-sm font-medium text-white bg-indigo-700 border border-transparent rounded-md shadow-sm hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={handleFollow}
        >
          <UserAddIcon className="w-5 h-5 mr-2 -ml-1 text-white" aria-hidden="true" />
          <span>Follow</span>
        </button>
      )}
    </>
  )
}

export default Follow
