import React from 'react'
import CommentDisplay from './comment-display'

const Comments = ({ post }) => {
  return (
    <div className="p-4">
      {post.comments.map((comment) => (
        <CommentDisplay key={comment._id} comment={comment} post={post} />
      ))}
    </div>
  )
}

export default Comments
