import React, { useEffect, useState } from 'react'
import PostThumb from './post-thumbnail'

const Posts = ({ auth, id, dispatch, profile }) => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    profile.userPosts.forEach((data) => {
      if (data._id === id) {
        setPosts(data.posts)
      }
    })
  }, [profile.userPosts, id])
  return <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">{/* <PostThumb posts={posts} /> */}</div>
}

export default Posts
