import Card from '@components/card'
import React from 'react'
import { useSelector } from 'react-redux'

const Posts = () => {
  const { homePosts } = useSelector((state) => state)
  return <div className="">{homePosts.posts && homePosts.posts.map((post) => <Card key={post._id} post={post} />)}</div>
}

export default Posts
