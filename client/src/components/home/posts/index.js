import Loading from '@components/alert/loading'
import Posts from '@components/home/posts/posts'
import { getPosts } from '@context/store/actions/postAction'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const index = () => {
  const { auth, homePosts } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if (auth.token) dispatch(getPosts(auth.token))
  }, [dispatch, auth.token])

  return (
    <div>
      {homePosts.loading ? (
        <Loading />
      ) : homePosts.result === 0 ? (
        <p className="py-8 text-center text-gray-500">No Posts to show</p>
      ) : (
        <Posts />
      )}
    </div>
  )
}

export default index
