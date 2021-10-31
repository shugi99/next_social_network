import { refreshToken } from '@context/store/actions/authAction'
import { useRouter } from 'next/router'
import router from 'next/router'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from '@components/header'

const Init = ({ children }) => {
  const { auth } = useSelector((state) => state)
  const router = useRouter()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(refreshToken())
  }, [dispatch])

  useEffect(() => {
    if (auth.token) {
      router.push('/')
    }
  }, [auth.token])
  return (
    <>
      {/* {auth.token && <Header />} */}
      {children}
    </>
  )
}

export default Init
