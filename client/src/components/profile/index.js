import React from 'react'
import Info from './info'
import Posts from './posts'
import { useSelector } from 'react-redux'
import Loading from '@components/alert/loading'

const Profile = () => {
  const { profile } = useSelector((state) => state)

  return (
    <div>
      {profile.loading && <Loading />}
      <Info />
      {/* <Posts /> */}
    </div>
  )
}

export default Profile
