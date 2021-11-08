import { HeartIcon } from '@heroicons/react/outline'
import { HeartIcon as HeartIconSolid } from '@heroicons/react/solid'
import React from 'react'

const Like = ({ like, handleLike, handleUnlike }) => {
  return (
    <div>
      {like ? (
        <HeartIconSolid className="w-6 h-6 text-red-600 cursor-pointer" onClick={handleUnlike} />
      ) : (
        <HeartIcon className="w-6 h-6 cursor-pointer" onClick={handleLike} />
      )}
    </div>
  )
}

export default Like
