import Avatar from '@components/avatar'
import { GLOBALTYPES } from '@context/store/actions/globalTypes'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Status = () => {
  const { auth } = useSelector((state) => state)
  const dispatch = useDispatch()
  return (
    <div className="p-2 mt-6 font-medium text-gray-500 bg-white border-2 border-gray-200 shadow-md rounded-2xl">
      <div className="flex items-center p-4 space-x-4">
        <Avatar src={auth.user?.avatar} className="w-10 h-10 rounded-full" />
        <form className="flex flex-1" onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}>
          <input
            type="text"
            className="flex-grow h-12 px-5 bg-gray-100 rounded-full focus:outline-none"
            placeholder={`What's on your mind, ${auth.user?.fullname}?`}
          />
          {/* <button type="submit" onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}></button> */}
        </form>
      </div>
    </div>
  )
}

export default Status
