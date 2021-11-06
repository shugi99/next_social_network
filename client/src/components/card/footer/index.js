import { BookmarkIcon, ChatIcon, HeartIcon, PaperAirplaneIcon } from '@heroicons/react/outline'
import React from 'react'
import Link from 'next/link'

const CardFooter = ({ post }) => {
  return (
    <div className="p-4 ">
      <div className="flex justify-between w-full ">
        <div className="flex">
          <HeartIcon className="w-6 h-6" />
          <Link href={`/post/${post._id}`}>
            <a>
              <ChatIcon className="w-6 h-6" />
            </a>
          </Link>
          <PaperAirplaneIcon className="w-6 h-6" />
        </div>
        <BookmarkIcon className="w-6 h-6" />
      </div>
      <div className="flex justify-between pt-2">
        <h6 className="cursor-pointer">{post.likes.length}</h6>
        <h6 className="cursor-pointer">{post.comments.length} comments</h6>
      </div>
    </div>
  )
}

export default CardFooter
