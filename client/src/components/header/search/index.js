import { SearchIcon, XIcon } from '@heroicons/react/outline'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { getDataAPI } from '@utils/fetchData'
import { GLOBALTYPES } from '@context/store/actions/globalTypes'
import UserCard from '@components/user-card'
import Loading from '@components/alert/loading'

const Search = () => {
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  const { auth } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    if (search && auth.token) {
      getDataAPI(`search?username=${search}`, auth.token)
        .then((res) => setUsers(res.data.users))
        .catch((err) => {
          dispatch({ type: GLOBALTYPES.ALERT, paylod: { error: err.response.data.msg } })
        })
    } else {
      setUsers([])
    }
  }, [search, auth.token, dispatch])

  const handleClose = () => {
    setSearch('')
    setUsers('')
  }
  const handleSearch = async (e) => {
    e.preventDefault()
    if (!search) return
    try {
      setLoading(true)
      const res = getDataAPI(`search?username=${search}`, auth.token)
      setUsers(res.data.users)
      setLoading(false)
    } catch (error) {
      dispatch({ type: GLOBALTYPES.ALERT, paylod: { error: err.response.data.msg } })
    }
  }
  return (
    <div className="flex items-center justify-center flex-1 px-2 lg:ml-6 lg:justify-end">
      <div className="w-full max-w-lg lg:max-w-xs">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <SearchIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            // id="search"
            // name="search"
            className="block w-full py-2 pl-10 pr-3 leading-5 placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Search"
            // type="search"
            value={search || ''}
            onChange={(e) => setSearch(e.target.value.toLowerCase().replace(/ /g, ''))}
          />

          {search && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" onClick={handleClose}>
              <XIcon className="w-4 h-4 text-gray-400" aria-hidden="true" />
            </div>
          )}
          <div className="absolute w-full mt-2 overflow-auto">
            <div className="flex flex-col">
              {search &&
                users.map((user) => (
                  <Link key={user._id} href={`/profile/${user._id}`}>
                    <a onClick={handleClose}>
                      <UserCard user={user} border="true" />
                    </a>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
