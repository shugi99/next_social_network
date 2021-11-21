import React from 'react'
import Status from './status'
import Posts from './posts'

const Home = () => {
  return (
    <div className="flex px-2 mx-auto max-w-7xl sm:px-4 lg:px-8 mt-28">
      <div className="md:w-1/2 xl:w-2/3">
        <Status />
        <Posts />
      </div>
      <div className="h-screen p-2 mt-6 ml-6 font-medium text-gray-500 border-2 border-gray-200 shadow-md md:w-1/2 xl:w-1/3 rounded-2xl">
        side bar
      </div>
    </div>
  )
}

export default Home
