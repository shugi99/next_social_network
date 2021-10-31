import React from 'react'
import PropTypes from 'prop-types'
import SyncLoader from 'react-spinners/SyncLoader'

const Loading = ({ className, color, size }) => {
  return (
    <div className={`h-screen bg-white bg-opacity-80 fixed flex justify-center items-center w-full z-50`}>
      <SyncLoader color={color} loading={true} size={size} />
    </div>
  )
}

Loading.defaultProps = {
  size: 10,
  color: '#6366f1',
}

export default Loading
