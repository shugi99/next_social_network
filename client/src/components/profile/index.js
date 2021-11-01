import React from 'react'
import Info from './info'
import Posts from './posts'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import Loading from '@components/alert/loading'

const Profile = () => {
  const router = useRouter()
  const { profile } = useSelector((state) => state)

  return (
    <div>
      {profile.loading && <Loading />}
      <Info id={router.query?.id} />
      <Posts />
    </div>
  )
}

export default Profile
