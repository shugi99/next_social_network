import React from 'react'

const Avatar = ({ src, className, size }) => {
  const def = 'https://res.cloudinary.com/dybmlbceb/image/upload/v1637090243/mwvwe2av3ivvzxhofikp.jpg'
  const avatar = size === 'small' ? 'w-8 h-8' : 'medium' ? 'w-10 h-10' : 'large' && 'w-12 h-12'

  return <img src={src ? src : def} alt="avatar" className={className} />
}

export default Avatar
