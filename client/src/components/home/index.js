import React from 'react'
import Status from './status'
import Posts from './posts'
import Modal from '@components/modal'

const Home = () => {
  return (
    <div className="px-2 mx-auto border-red-300 max-w-7xl sm:px-4 lg:px-8 ">
      <div className="lg:w-1/2">
        <Modal />
        <Status />
        <Posts />
      </div>
    </div>
  )
}

export default Home
