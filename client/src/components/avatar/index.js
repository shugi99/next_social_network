import React from 'react'
import { useSelector } from 'react-redux'

const Avatar = ({ src, className, size }) => {
  const def = 'https://res.cloudinary.com/dybmlbceb/image/upload/v1637090243/mwvwe2av3ivvzxhofikp.jpg'
  const avatar = size === 'small' ? 'w-8 h-8' : 'medium' ? 'w-10 h-10' : 'large' && 'w-12 h-12'
  //   const { theme } = useSelector((state) => state)

  return <img src={src ? src : def} alt="avatar" className={className} />
  //   style={{ filter: `${theme ? 'invert(1)' : 'invert(0)'}` }}
}

export default Avatar
