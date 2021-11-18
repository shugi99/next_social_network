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
      dispatch(getProfileUsers({ users: profile.users, id, auth }))
    }
  }, [id, profile.user, auth])

  return (
    <div>
      {profile.loading ? <Loading /> : <Info auth={auth} profile={profile} dispatch={dispatch} id={id} />}
      <Posts auth={auth} profile={profile} dispatch={dispatch} id={id} />
    </div>
  )
}

export default Profile
