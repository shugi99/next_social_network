import Loading from '@components/alert/loading'
import LoadMore from '@components/load-more'
import PostThumb from '@components/profile/posts/post-thumbnail'
import { DISCOVER_TYPES, getPostDiscover } from '@context/store/actions/discoverAction'
import { getDataAPI } from '@utils/fetchData'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Discover = () => {
  const { auth, discover } = useSelector((state) => state)
  const dispatch = useDispatch()

  const [load, setLoad] = useState(false)

  useEffect(() => {
    if (!discover.firstLoad) {
      dispatch(getPostDiscover(auth.token))
    }
  }, [dispatch, auth.token, discover.firstLoad])

  const handleLoadMore = async () => {
    setLoad(true)
    const res = await getDataAPI(`post_discover?limit=${discover.page * 9}`, auth.token)
    dispatch({ type: DISCOVER_TYPES.UPDATE_POST, payload: res.data })
    setLoad(false)
  }

  return (
    <div>
      {discover.loading ? (
        <Loading />
      ) : (
        <div className="max-w-5xl px-4 mx-auto mt-16 lg:mt-36 sm:px-6 lg:px-8">
          <PostThumb posts={discover.posts} result={discover.result} />
        </div>
      )}
      {!discover.loading && (
        <LoadMore
          result={discover.result}
          page={discover.page}
          load={discover.loadig}
          handleLoadMore={handleLoadMore}
        />
      )}
    </div>
  )
}

export default Discover
