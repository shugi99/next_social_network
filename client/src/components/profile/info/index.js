import Avatar from '@components/avatar'
import { getProfileUsers } from '@context/store/actions/profileAction'
import { CogIcon, MailIcon, PhoneIcon } from '@heroicons/react/outline'
import { get } from 'mongoose'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import EditProfile from '../edit-profile'

const Info = ({ id }) => {
  const { auth, profile } = useSelector((state) => state)
  const dispatch = useDispatch()

  const [userData, setUserData] = useState([])
  const [onEdit, setOnEdit] = useState(true)

  useEffect(() => {
    if (id === auth.user._id) {
      setUserData([auth.user])
    } else {
      dispatch(getProfileUsers({ users: profile.users, id, auth }))
      const newData = profile.users.filter((user) => user._id === id)
      setUserData(newData)
    }
  }, [id, auth.user, profile.users])
  return (
    <div>
      {userData.map((user, key) => (
        <div key={key}>
          <div>
            <div>
              {/* <Avatar src={userData?.avatar} className="object-cover w-full h-32 lg:h-48" alt="" /> */}
              <div className="object-cover w-full h-32 bg-indigo-100 lg:h-26" alt="" />
            </div>
            <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
              <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
                <div className="flex">
                  <Avatar src={userData?.avatar} className="w-24 h-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32" />
                </div>
                <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                  <div className="flex-1 min-w-0 mt-6 sm:hidden 2xl:block">
                    <h1 className="text-2xl font-bold text-gray-900 truncate">{user.fullname}</h1>
                  </div>
                  <div className="flex flex-col mt-6 space-y-3 justify-stretch sm:flex-row sm:space-y-0 sm:space-x-4">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    >
                      <MailIcon className="w-5 h-5 mr-2 -ml-1 text-gray-400" aria-hidden="true" />
                      <span>Message</span>
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                      onClick={() => setOnEdit(true)}
                    >
                      <CogIcon className="w-5 h-5 mr-2 -ml-1 text-gray-400" aria-hidden="true" />
                      <span>Edit Profile</span>
                    </button>
                  </div>
                </div>
              </div>
              {onEdit && <EditProfile user={user} setOnEdit={setOnEdit} onEdit={onEdit} />}
              <div className="flex-1 hidden min-w-0 mt-6 sm:block 2xl:hidden">
                <h1 className="text-2xl font-bold text-gray-900 truncate">name</h1>
              </div>

              <div className="max-w-5xl px-4 mx-auto mt-6 sm:px-6 lg:px-8">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">{user.username}</dt>
                    <div className="flex pb-1 2xl:w-1/2">
                      <dd className="w-1/2 mt-1 text-sm font-medium text-gray-500 underline">
                        {user.followers.length} Followers
                      </dd>
                      <dd className="w-1/2 mt-1 text-sm font-medium text-gray-500 underline">
                        {user.following.length}Following{' '}
                      </dd>
                    </div>
                    <dt className="mt-1 text-sm font-medium text-gray-500">{user.email}</dt>
                    {/* <a href={user.website} target="_blank" rel="noreferrer">
                      {user.website}
                    </a> */}
                    <dd
                      className="mt-1 space-y-5 text-sm text-gray-900 max-w-prose"
                      dangerouslySetInnerHTML={{ __html: user.story }}
                    />
                  </div>

                  {/*            
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">About</dt>
                    <dd
                      className="mt-1 space-y-5 text-sm text-gray-900 max-w-prose"
                      dangerouslySetInnerHTML={{ __html: profile.about }}
                    />
                  </div> */}
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Info