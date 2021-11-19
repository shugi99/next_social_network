import Header from '@components/header'
import Post from '@components/post'
import ProtectedRoute from '@components/protected'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { getPost } from '@context/store/actions/postAction'
import Loading from '@components/alert/loading'
import PostCard from '@components/post-card'
import Card from '@components/card'

const index = () => {
  const [post, setPost] = useState([])

  const router = useRouter()
  const id = router.query.id

  const { auth, detailPost } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPost({ detailPost, id, auth }))
    if (detailPost.length > 0) {
      const newArr = detailPost.filter((post) => post._id === id)
      setPost(newArr)
    }
  }, [detailPost, dispatch])
  return (
    // <ProtectedRoute>
    <>
      <Header />
      {/* <Post /> */}
      <div className="post">
        {post.length === 0 && <Loading />}
        <div className="px-2 mx-auto max-w-7xl sm:px-4 lg:px-8 mt-28">
          <div className="mx-auto md:w-1/2 xl:w-2/3">
            {post.map((item) => (
              <Card key={item._id} post={item} />
            ))}
          </div>
        </div>
      </div>
    </>
    // </ProtectedRoute>
  )
}

export default index
