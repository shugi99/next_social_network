import Loading from '@components/alert/loading'
import Follow from '@components/profile/info/follow'
import UserCard from '@components/user-card'
import { getSuggestions } from '@context/store/actions/suggestionsAction'
import { RefreshIcon } from '@heroicons/react/outline'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const SideBar = () => {
  const { auth, suggestions } = useSelector((state) => state)
  const dispatch = useDispatch()
  return (
    <div className="p-2 mt-6 ml-6 font-medium text-gray-500 border-2 border-gray-200 shadow-md h-[750px] rounded-2xl">
      <div className="flex items-center justify-center pt-4">
        <h5>User suggestions</h5>
        {!suggestions.loading && (
          <RefreshIcon
            className="w-5 h-5 ml-2 text-indigo-500 cursor-pointer"
            onClick={() => dispatch(getSuggestions(auth.token))}
          />
        )}
      </div>
      {suggestions.loading ? (
        <div className="flex items-center justify-center p-4">loading</div>
      ) : (
        <div className="p-4 h-[650px]">
          {suggestions.users &&
            suggestions.users.map((user) => (
              <div key={user._id}>
                <UserCard user={user}>
                  <Follow user={user} />
                </UserCard>
              </div>
            ))}
        </div>
      )}
      <div className="flex items-center justify-center text-indigo-400">
        <a href="https://www.facebook.com/shugiyen.lazala" target="_blank" rel="noreferrer">
          Add on me facebook
        </a>
      </div>
    </div>
  )
}

export default SideBar
