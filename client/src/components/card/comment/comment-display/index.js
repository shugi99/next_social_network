import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Avatar from '@components/avatar'
import moment from 'moment'
import Like from '@components/like'
import { useDispatch, useSelector } from 'react-redux'
import CommentMenu from '../comment-menu'
import { set } from 'mongoose'
import { likeComment, unLikeComment, updateComment } from '@context/store/actions/commentAction'

const CommentCard = ({ comment, post }) => {
  const { auth } = useSelector((state) => state)
  const dispatch = useDispatch()

  const [content, setContent] = useState('')
  const [readMore, setReadMore] = useState(false)

  const [like, setLike] = useState(false)
  const [onEdit, setOnEdit] = useState(false)
  const [loadLike, setLoadLike] = useState(false)

  const handleLike = async () => {
    if (loadLike) return
    setLike(true)

    setLoadLike(true)
    await dispatch(likeComment({ comment, post, auth }))
    setLoadLike(false)
  }

  const handleUnlike = async () => {
    if (loadLike) return
    setLike(false)

    setLoadLike(true)
    await dispatch(unLikeComment({ comment, post, auth }))
    setLoadLike(false)
  }

  const handleUpdate = () => {
    if (comment.content !== content) {
      dispatch(updateComment({ comment, post, content, auth }))
      setOnEdit(false)
    } else {
      setOnEdit(false)
    }
  }
  useEffect(() => {
    setContent(comment.content)
    if (comment.likes.find((like) => like._id === auth.user._id)) {
      setLike(true)
    }
  }, [comment, auth.user._id])

  const styleCard = {
    opacity: comment._id ? 1 : 0,
  }
  return (
    <div className={`${comment._id ? ' pointer-events-auto' : 'opacity-50'} mt-2`}>
      <Link href={`/profile/${comment.user._id}`}>
        <a className="flex text-gray-500">
          <Avatar src={comment.user.avatar} className="w-6 h-6" />
          <h6 className="pl-2">{comment.user.username}</h6>
        </a>
      </Link>
      <div className="p-2 mt-2 bg-indigo-100 rounded-md bg-opacity-20 ">
        <div className="flex ">
          {onEdit ? (
            <textarea
              className="flex-1 bg-indigo-100 bg-opacity-10 focus:outline-none"
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : (
            <span className="flex-1 break-word">
              {content.length < 200 ? content : readMore ? content + '' : content.slice(0, 175) + '...'}&nbsp;
            </span>
          )}

          <div className="flex items-center ">
            <CommentMenu post={post} comment={comment} auth={auth} setOnEdit={setOnEdit} />
            <Like like={like} handleLike={handleLike} handleUnlike={handleUnlike} />
          </div>
        </div>
        {!onEdit && content.length > 200 && (
          <span className="text-indigo-600 break-all" onClick={() => setReadMore(!readMore)}>
            {readMore ? 'Hide content' : 'Read more'}
          </span>
        )}

        <div className="justify-between ">
          <small className="text-gray-400 cursor-pointer">{moment(comment.createdAt).fromNow()}</small>
          <small className="pl-2 font-bold cursor-pointer">{comment.likes.length} likes</small>
          {onEdit ? (
            <>
              <small className="pl-2 font-bold cursor-pointer" onClick={handleUpdate}>
                update
              </small>
              <small className="pl-2 font-bold cursor-pointer" onClick={() => setOnEdit(false)}>
                cancel
              </small>
            </>
          ) : (
            <small className="pl-2 font-bold cursor-pointer">reply</small>
          )}
        </div>
      </div>
    </div>
  )
}

export default CommentCard
