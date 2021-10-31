import React from 'react'
import { useSelector } from 'react-redux'
import Loading from './loading'
import Toast from './toast'

const Alert = () => {
  const { alert } = useSelector((state) => state)
  return (
    <div>
      {alert.loading && <Loading />}
      {alert.error && <Toast msg={{ title: 'Error', body: alert.error }} bgColor="red" />}
      {alert.success && <Toast msg={{ title: 'Success', body: alert.success }} bgColor="green" />}
    </div>
  )
}

export default Alert
