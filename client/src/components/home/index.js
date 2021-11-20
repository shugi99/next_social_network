import React from 'react'
import Status from './status'
import Posts from './posts'

const Home = () => {
  return (
    <div className="px-2 mx-auto max-w-7xl sm:px-4 lg:px-8 mt-28">
      <div className="md:w-1/2 xl:w-2/3">
        <Status />
        <Posts />
      </div>
    </div>
  )
}

export default Home
