import React, { useEffect, useState } from 'react'
import CommentDisplay from './comment-display'

const Comments = ({ post }) => {
  const [comments, setComments] = useState([])
  const [showComments, setShowComments] = useState([])

  const [next, setNext] = useState(2)

  const [replyComments, setReplyComments] = useState([])

  useEffect(() => {
    const newCm = post.comments.filter((cm) => !cm.reply)
    setComments(newCm)
    setShowComments(newCm.slice(newCm.length - next))
  }, [post.comments, next])

  useEffect(() => {
    const newRep = post.comments.filter((cm) => cm.reply)
    setReplyComments(newRep)
  }, [post.comments])

  return (
    <div className="p-2 px-4">
      {showComments.map((comment) => (
        <CommentDisplay
          key={comment._id}
          comment={comment}
          post={post}
          commentId={comment._id}
          replyCm={replyComments.filter((item) => item.reply === comment._id)}
        />
      ))}
      {comments.length - next > 0 ? (
        <div className="pt-2 text-red-400 cursor-pointer" onClick={() => setNext(next + 10)}>
          See More Comments
        </div>
      ) : (
        comments.length > 2 && (
          <div className="pt-2 text-red-400 cursor-pointer" onClick={() => setNext(2)}>
            Hide Comments
          </div>
        )
      )}
    </div>
  )
}

export default Comments
