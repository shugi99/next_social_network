import React from 'react'

const LoadMore = ({ result, page, load, handleLoadMore }) => {
  return (
    <div className="py-8 text-center text-gray-500">
      {result < 9 * (page - 1)
        ? ''
        : !load && (
            <button
              className="px-4 py-2 text-sm font-medium text-center text-white bg-indigo-500 border border-transparent rounded-md group hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleLoadMore}
            >
              Load More
            </button>
          )}
    </div>
  )
}

export default LoadMore
