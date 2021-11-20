import Card from '@components/card'
import LoadMore from '@components/load-more'
import { POST_TYPES } from '@context/store/actions/postAction'
import { PROFILE_TYPES } from '@context/store/actions/profileAction'
import { getDataAPI } from '@utils/fetchData'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Posts = () => {
  const { homePosts, auth, theme } = useSelector((state) => state)
  const dispatch = useDispatch()

  const [load, setLoad] = useState(false)

  const handleLoadMore = async () => {
    setLoad(true)
    const res = await getDataAPI(`posts?limit=${homePosts.page * 9}`, auth.token)

    dispatch({
      type: POST_TYPES.GET_POSTS,
      payload: { ...res.data, page: homePosts.page + 1 },
    })

    setLoad(false)
  }

  return (
    <div className="">
      {homePosts.posts && homePosts.posts.map((post) => <Card key={post._id} post={post} />)}
      {!load && (
        <LoadMore result={homePosts.result} page={homePosts.page} load={load} handleLoadMore={handleLoadMore} />
      )}
    </div>
  )
}

export default Posts
