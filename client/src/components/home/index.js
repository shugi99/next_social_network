import React from 'react'
import Status from './status'
import Posts from './posts'
import SideBar from './sidebar'

const Home = () => {
  return (
    <div className="flex px-2 mx-auto mt-16 max-w-7xl sm:px-4 lg:px-8">
      <div className="w-full md:w-2/3">
        <Status />
        <Posts />
      </div>
      <div className="hidden md:block md:w-1/3">
        <SideBar />
      </div>
    </div>
  )
}

export default Home
