import Header from '@components/header'
import ProtectedRoute from '@components/protected'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Home from '@components/home'

const index = () => {
  return (
    <ProtectedRoute>
      <Header />
      <Home />
    </ProtectedRoute>
  )
}

export default index
