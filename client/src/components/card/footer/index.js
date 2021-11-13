import { BookmarkIcon, ChatIcon, HeartIcon, PaperAirplaneIcon } from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Like from '@components/like'
import { useDispatch, useSelector } from 'react-redux'
import { likePost, unLikePost } from '@context/store/actions/postAction'

const CardFooter = ({ post }) => {
  const [like, setLike] = useState(false)
  const [loadLike, setLoadLike] = useState(false)

  const { auth } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if (post.likes.find((like) => like._id === auth.user._id)) {
      setLike(true)
    }
  }, [post.like, auth.user._id])

  const handleLike = async () => {
    if (loadLike) return
    setLike(true)
    setLoadLike(true)
    await dispatch(likePost({ post, auth }))
    setLoadLike(false)
  }

  const handleUnlike = async () => {
    if (loadLike) return
    setLike(false)
    setLoadLike(true)
    await dispatch(unLikePost({ post, auth }))
    setLoadLike(false)
  }

  return (
    <div className="px-4 pt-4">
      <div className="flex justify-between w-full ">
        <div className="flex">
          <Like like={like} handleLike={handleLike} handleUnlike={handleUnlike} />
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
        <h6 className="cursor-pointer">{post.likes.length} likes</h6>
        <h6 className="cursor-pointer">{post.comments.length} comments</h6>
      </div>
    </div>
  )
}

export default CardFooter
