import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Avatar from '@components/avatar'
import moment from 'moment'
import Like from '@components/like'
import { useDispatch, useSelector } from 'react-redux'
import CommentMenu from '../comment-menu'
import { likeComment, unLikeComment, updateComment } from '@context/store/actions/commentAction'
import InputComment from '@components/card/input-comment'

const CommentCard = ({ children, comment, post, commentId, replyCm }) => {
  const { auth } = useSelector((state) => state)
  const dispatch = useDispatch()

  const [content, setContent] = useState('')
  const [readMore, setReadMore] = useState(false)

  const [like, setLike] = useState(false)
  const [onEdit, setOnEdit] = useState(false)
  const [loadLike, setLoadLike] = useState(false)

  const [onReply, setOnReply] = useState(false)

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

  const handleReply = () => {
    if (onReply) return setOnReply(false)
    setOnReply({ ...comment, commentId })
  }

  useEffect(() => {
    setContent(comment.content)
    setLike(false)
    setOnReply(false)
    if (comment.likes.find((like) => like._id === auth.user._id)) {
      setLike(true)
    }
  }, [comment, auth.user._id])

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
              className="flex-1 pl-2 bg-indigo-100 bg-opacity-20 focus:outline-none"
              rows="5"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          ) : (
            <div className="flex-1 break-word">
              {comment.tag && comment.tag._id !== comment.user._id && (
                <Link href={`/profile/${comment.tag._id}`}>
                  <a className="text-blue-400">@{comment.tag.username}&nbsp;&nbsp;&nbsp;</a>
                </Link>
              )}
              <span>
                {content.length < 200 ? content : readMore ? content + '' : content.slice(0, 175) + '...'}&nbsp;
              </span>
            </div>
          )}

          <div className="flex items-center ">
            <CommentMenu post={post} comment={comment} auth={auth} setOnEdit={setOnEdit} />
            <Like like={like} handleLike={handleLike} handleUnlike={handleUnlike} />
          </div>
        </div>
        {!onEdit && content.length > 200 && (
          <span className="text-indigo-400 break-all cursor-pointer" onClick={() => setReadMore(!readMore)}>
            {readMore ? 'Hide content' : 'Read more'}
          </span>
        )}

        <div className="justify-between ">
          <small className="text-gray-400">{moment(comment.createdAt).fromNow()}</small>
          <small className="pl-2 font-bold">{comment.likes.length} likes</small>
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
            <small className="pl-2 font-bold cursor-pointer" onClick={handleReply}>
              {onReply ? 'cancel' : 'reply'}
            </small>
          )}
        </div>
        {onReply && (
          <InputComment post={post} onReply={onReply} setOnReply={setOnReply}>
            <Link href={`/profile/${onReply.user._id}`}>
              <a className="text-blue-400">@{onReply.user.username}:&nbsp;</a>
            </Link>
          </InputComment>
        )}
      </div>
      {children}
    </div>
  )
}

export default CommentCard
