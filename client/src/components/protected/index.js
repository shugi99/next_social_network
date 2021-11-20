import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'

const ProtectedRoute = ({ children }) => {
  const router = useRouter()
  const { auth } = useSelector((state) => state)

  useEffect(() => {
    if (!auth.token) {
      router.push('/login')
    }
  }, [auth.token])

  return <div>{auth.token && children}</div>
}

export default ProtectedRoute
