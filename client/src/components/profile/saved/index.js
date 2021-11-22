import Loading from '@components/alert/loading'
import LoadMore from '@components/load-more'
import { GLOBALTYPES } from '@context/store/actions/globalTypes'
import { PROFILE_TYPES } from '@context/store/actions/profileAction'
import { getDataAPI } from '@utils/fetchData'
import { images } from 'next.config'
import React, { useEffect, useState } from 'react'
import PostThumb from '../posts/post-thumbnail'
// import PostThumb from './post-thumbnail'

const Saved = ({ auth, id, dispatch, profile }) => {
  const [savePosts, setSavePosts] = useState([])
  const [result, setResult] = useState(9)
  const [page, setPage] = useState(0)
  const [load, setLoad] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoad(true)
        const res = await getDataAPI('getSavePosts', auth.token)
        setSavePosts(res.data.savePosts)
        setResult(res.data.result)
      } catch (error) {
        dispatch({ type: GLOBALTYPES.ALERT, payload: { error: error.response.data.msg } })
      }
    }
    fetch()

    return () => setSavePosts([])
  }, [auth.token, dispatch])

  const handleLoadMore = async () => {
    setLoad(true)
    const res = await getDataAPI(`getSavePosts?limit=${page * 9}`, auth.token)
    setSavePosts(res)
    setResult(res.data.result)
    setPage(page + 1)
    setLoad(false)
  }
  return (
    <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
      <PostThumb posts={savePosts} result={result} />

      {!load && <LoadMore result={result} page={page} load={load} handleLoadMore={handleLoadMore} />}
    </div>
  )
}

export default Saved
