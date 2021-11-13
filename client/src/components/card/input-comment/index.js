import { createComment } from '@context/store/actions/commentAction'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const InputComment = ({ children, post }) => {
  const [content, setContent] = useState('')

  const { auth } = useSelector((state) => state)
  const dispatch = useDispatch()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!content.trim()) return setContent('')
    const newComment = {
      content,
      likes: [],
      user: auth.user,
      createdAt: new Date().toISOString(),
    }

    dispatch(createComment({ post, newComment, auth }))
  }
  return (
    <form className="flex items-center " onSubmit={handleSubmit}>
      {children}
      <input
        className="flex-1 p-4 overflow-auto bg-gray-100 border-none outline-none"
        value={content || ''}
        onChange={(e) => setContent(e.target.value)}
        type="text"
        placeholder="Add your comment.."
      />

      <button type="submit" className="p-4 bg-gray-100 border-0 outline-none">
        Post
      </button>
    </form>
  )
}

export default InputComment
