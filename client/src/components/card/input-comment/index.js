import { createComment } from '@context/store/actions/commentAction'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const InputComment = ({ children, post, onReply, setOnReply }) => {
  const [content, setContent] = useState('')

  const { auth } = useSelector((state) => state)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!content.trim()) {
      if (setOnReply) return setOnReply(false)
      return
    }
    setContent('')
    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
      reply: onReply && onReply.commentId,
      tag: onReply && onReply.user,
    }

    dispatch(createComment({ post, newComment, auth }))

    if (setOnReply) return setOnReply(false)
  }
  return (
    <form className="flex items-center " onSubmit={handleSubmit}>
      {children}
      <input
        className={`
          ${onReply ? 'p-2' : 'bg-gray-100 p-4'} flex-1  overflow-auto  border-none outline-none`}
        value={content || ''}
        onChange={(e) => setContent(e.target.value)}
        type="text"
        placeholder="Add your comment.."
      />

      <button type="submit" className={`${onReply ? ' ' : ' bg-gray-100'} font-semibold p-4 border-0 outline-none`}>
        Post
      </button>
    </form>
  )
}

export default InputComment
