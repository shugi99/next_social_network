import Header from '@components/header'
import Profile from '@components/profile'
import ProtectedRoute from '@components/protected'
import React, { useEffect } from 'react'

const index = () => {
  return (
    <ProtectedRoute>
      <Header />
      <Profile />
    </ProtectedRoute>
  )
}

export default index
