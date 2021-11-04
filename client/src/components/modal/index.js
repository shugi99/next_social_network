import React from 'react'
import { useSelector } from 'react-redux'
import StatusModal from './status-modal'

const Modal = () => {
  const { status } = useSelector((state) => state)
  return <div>{status && <StatusModal />}</div>
}

export default Modal
