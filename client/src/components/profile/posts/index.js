import Loading from '@components/alert/loading'
import LoadMore from '@components/load-more'
import { PROFILE_TYPES } from '@context/store/actions/profileAction'
import { getDataAPI } from '@utils/fetchData'
import { images } from 'next.config'
import React, { useEffect, useState } from 'react'
import PostThumb from './post-thumbnail'

const Posts = ({ auth, id, dispatch, profile }) => {
  const [posts, setPosts] = useState([])
  const [result, setResult] = useState(9)
  const [page, setPage] = useState(0)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    profile.posts.forEach((data) => {
      if (data._id === id) {
        setPosts(data.posts)
        setResult(data.result)
        setPage(data.page)
      }
    })
  }, [profile.posts, id])

  const handleLoadMore = async () => {
    setLoad(true)
    const res = await getDataAPI(`user_posts/${id}?limit=${page * 9}`, auth.token)
    console.log(res)
    const newData = { ...res.data, page: page + 1, _id: id }
    dispatch({ type: PROFILE_TYPES.UPDATE_POST, payload: newData })
    setLoad(false)
  }
  return (
    <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
      <PostThumb posts={posts} result={result} />

      {!load && <LoadMore result={result} page={page} load={load} handleLoadMore={handleLoadMore} />}
    </div>
  )
}

export default Posts
