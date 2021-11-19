import React, { useEffect } from 'react'
import Info from './info'
import Posts from './posts'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '@components/alert/loading'
import { getProfileUsers } from '@context/store/actions/profileAction'
import { useRouter } from 'next/router'

const Profile = () => {
  const { profile, auth } = useSelector((state) => state)
  const dispatch = useDispatch()

  const router = useRouter()
  const id = router.query.id

  useEffect(() => {
    if (profile.ids.every((item) => item !== id)) {
      dispatch(getProfileUsers({ id, auth }))
    }
  }, [id, auth, dispatch, profile.ids])

  return (
    <div>
      <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />
      {profile.loading ? (
        <div className="">
          <Loading />
        </div>
      ) : (
        <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
      )}
    </div>
  )
}

export default Profile
