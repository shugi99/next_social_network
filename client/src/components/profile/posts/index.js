import React, { useEffect, useState } from 'react'
import PostThumb from './post-thumbnail'

const Posts = ({ auth, id, dispatch, profile }) => {
  const [posts, setPosts] = useState([])
  const [result, setResult] = useState(9)

  useEffect(() => {
    profile.userPosts.forEach((data) => {
      if (data._id === id) {
        setPosts(data.posts)
        setResult(data.result)
      }
    })
  }, [profile.userPosts, id])
  return (
    <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
      <PostThumb posts={posts} result={result} />
    </div>
  )
}

export default Posts
