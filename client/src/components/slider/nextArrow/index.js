import React from 'react'
import PropTypes from 'prop-types'
import { ChevronRightIcon } from '@heroicons/react/outline'

const SliderNextArrow = (props) => {
  const { onClick } = props
  return (
    //  arrow--hide
    <div className="top-0 right-0 z-10 w-1/2 h-full cursor-pointer arrow--hide" style={{ position: 'absolute' }}>
      <div className="relative w-full h-full">
        <button
          onClick={onClick}
          style={{ top: '45%', position: 'absolute' }}
          className="right-0 z-40 w-12 h-12 text-2xl bg-white rounded-full shadow-lg text-shadowblack focus:outline-none animate--button "
        >
          <span className="block">
            <ChevronRightIcon />
          </span>
        </button>
      </div>
    </div>
  )
}

SliderNextArrow.propTypes = {
  onClick: PropTypes.func,
}
export default SliderNextArrow
