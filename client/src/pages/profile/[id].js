import Header from '@components/header'
import Dropdown from '@components/header/dropdown'
import ProtectedRoute from '@components/protected'
import { refreshToken } from '@context/store/actions/authAction'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const index = () => {
  const { auth } = useSelector((state) => state)
  const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(refreshToken())
  // }, [dispatch])
  return (
    <ProtectedRoute>
      <Header />
      <div>Hey</div>
    </ProtectedRoute>
  )
}

export default index
