import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { likePost, savePost, unLikePost, unSavePost } from '@context/store/actions/postAction'
import { BASE_URL } from '@helpers/config'
import { BookmarkIcon, ChatIcon, PaperAirplaneIcon } from '@heroicons/react/outline'
import { BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/solid'
import ShareModal from './share-modal'
import Like from '@components/like'

const CardFooter = ({ post }) => {
  const [like, setLike] = useState(false)
  const [loadLike, setLoadLike] = useState(false)

  const [isShare, setIsShare] = useState(false)

  const { auth } = useSelector((state) => state)
  const dispatch = useDispatch()

  const [saved, setSaved] = useState(false)
  const [saveLoad, setSaveLoad] = useState(false)

  useEffect(() => {
    if (post.likes.find((like) => like._id === auth.user._id)) {
      setLike(true)
    } else {
      setLike(false)
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

  // Saved
  useEffect(() => {
    if (auth.user.saved.find((id) => id === post._id)) {
      setSaved(true)
    } else {
      setSaved(false)
    }
  }, [auth.user.saved, post._id])

  const handleSavePost = async () => {
    if (saveLoad) return

    setSaveLoad(true)
    await dispatch(savePost({ post, auth }))
    setSaveLoad(false)
  }

  const handleUnSavePost = async () => {
    if (saveLoad) return

    setSaveLoad(true)
    await dispatch(unSavePost({ post, auth }))
    setSaveLoad(false)
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
          <PaperAirplaneIcon className="w-6 h-6 cursor-pointer" onClick={() => setIsShare(!isShare)} />
        </div>

        {post.images.length === 0 ? (
          ''
        ) : saved ? (
          <BookmarkIconSolid className="w-6 h-6 text-green-800 cursor-pointer" onClick={handleUnSavePost} />
        ) : (
          <BookmarkIcon className="w-6 h-6 cursor-pointer" onClick={handleSavePost} />
        )}
      </div>
      <div className="flex justify-between pt-2">
        <h6 className="cursor-pointer">{post.likes.length} likes</h6>
        <h6 className="cursor-pointer">{post.comments.length} comments</h6>
      </div>
      {isShare && <ShareModal url={`${BASE_URL}/post/${post._id}`} />}
    </div>
  )
}

export default CardFooter
