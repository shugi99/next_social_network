import React from 'react'
import Link from 'next/link'
import { ChatIcon, HeartIcon } from '@heroicons/react/outline'

const PostThumb = ({ posts, result }) => {
  if (result === 0) return <p className="py-8 font-semibold text-center text-gray-500">No Posts to show</p>
  return (
    // <div className="grid grid-flow-row grid-cols-1 gap-4 py-12 md:grid-cols-3">
    //   {posts.map((post) => (
    //     <Link href={`/post/${post._id}`} key={post._id}>
    //       <a className="relative">
    //         <div classname="z-10 overflow-hidden bg-indigo-200 rounded-md cursor-pointer bg-opacity-60 group-hover:bg-opacity-70 hover:opacity-10">
    //           <img className="object-cover h-[250px] w-full" src={post.images[0].url} alt={post.images[0].url} />

    //           <div className="absolute top-0 left-0 flex items-center justify-center w-full transition-all duration-300 ease-out transform translate-y-24 ">
    //             <div className="flex">
    //               <HeartIcon className="w-6 h-6" />
    //               {post.likes.length}
    //               <ChatIcon className="w-6 h-6" />
    //               {post.comments.length}
    //             </div>
    //           </div>
    //         </div>
    //       </a>
    //     </Link>
    //   ))}
    // </div>

    <div className="grid grid-flow-row grid-cols-1 grid-rows-2 gap-12 py-4 md:grid-cols-3">
      {posts.map((post, index) => (
        <Link href={`/post/${post._id}`} key={post._id}>
          <a>
            <div
              key={index}
              className="relative z-10 overflow-hidden rounded-md shadow-xl cursor-pointer group h-[220px]"
            >
              <img className="" src={post.images[0].url} alt={post.images[0].url} />
              <div className="absolute bottom-0 left-0 flex flex-col items-center justify-center w-full py-8 transition-all duration-300 ease-out bg-opacity-60 h-28 group-hover:bg-opacity-75 group-hover:h-60">
                <div className="flex text-white">
                  <HeartIcon className="w-6 h-6" />
                  {post.likes.length}
                  <ChatIcon className="w-6 h-6" />
                  {post.comments.length}
                </div>
              </div>
            </div>
          </a>
        </Link>
      ))}
    </div>
  )
}

export default PostThumb
