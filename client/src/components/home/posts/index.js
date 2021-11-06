import Loading from '@components/alert/loading'
import Posts from '@components/home/posts/posts'
import { getPosts } from '@context/store/actions/postAction'
import authReducer from '@context/store/reducers/authReducer'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from 'react-spinners/SyncLoader'

const index = () => {
  const { auth, homePosts } = useSelector((state) => state)
  const dispatch = useDispatch()
  useEffect(() => {
    if (auth.token) dispatch(getPosts(auth.token))
  }, [dispatch, auth.token])
  return (
    <div>
      {homePosts.loading ? <Loading /> : homePosts.result === 0 ? <h2 className="text-center">No posts</h2> : <Posts />}
    </div>
  )
}

export default index
