import React from 'react'
import PropTypes from 'prop-types'
import { ChevronLeftIcon } from '@heroicons/react/outline'

const SliderPrevArrow = ({ onClick }) => {
  return (
    <div className="top-0 left-0 z-10 w-1/2 h-full cursor-pointer arrow--hide" style={{ position: 'absolute' }}>
      <div className="relative w-full h-full">
        <button
          onClick={onClick}
          style={{ top: '45%', position: 'absolute' }}
          className="left-0 z-40 w-12 h-12 text-2xl bg-white rounded-full shadow-lg text-shadowblack focus:outline-none animate--button "
        >
          <span className="block">
            <ChevronLeftIcon />
          </span>
        </button>
      </div>
    </div>
  )
}

SliderPrevArrow.propTypes = {
  onClick: PropTypes.func,
}

export default SliderPrevArrow
