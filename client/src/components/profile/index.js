import React, { useEffect, useState } from 'react'
import Info from './info'
import Posts from './posts'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '@components/alert/loading'
import { getProfileUsers } from '@context/store/actions/profileAction'
import { useRouter } from 'next/router'
import Saved from './saved'

const Profile = () => {
  const { profile, auth } = useSelector((state) => state)
  const dispatch = useDispatch()

  const router = useRouter()
  const id = router.query.id

  const [saveTab, setSaveTab] = useState(false)

  useEffect(() => {
    if (profile.ids.every((item) => item !== id)) {
      dispatch(getProfileUsers({ id, auth }))
    }
  }, [id, auth, dispatch, profile.ids])

  return (
    <div>
      <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />
      {auth.user._id === id && (
        <div className="flex items-center justify-center max-w-5xl px-4 mx-auto text-white sm:px-6 lg:px-1">
          <button
            className={`${
              saveTab ? 'bg-indigo-500' : 'bg-indigo-700'
            } px-4 py-2 mr-2 text-sm font-medium text-center text-white  border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            onClick={() => setSaveTab(false)}
          >
            Posts
          </button>
          <button
            className={`${
              saveTab ? 'bg-indigo-700' : 'bg-indigo-500'
            } px-4 py-2 ml-2 text-sm font-medium text-center text-white  border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
            onClick={() => setSaveTab(true)}
          >
            Saved
          </button>
        </div>
      )}

      {profile.loading ? (
        <div className="">
          <Loading />
        </div>
      ) : saveTab ? (
        <Saved auth={auth} profile={profile} />
      ) : (
        <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
      )}
    </div>
  )
}

export default Profile
