import React from 'react'
import Link from 'next/link'

const PostThumb = ({ posts }) => {
  return (
    <div>
      {posts.map((post) => (
        <Link href={`/post/${post._id}`} key={post._id}>
          <a>
            <div>
              <img src={post.images[0].url} alt={post.images[0].url} />
            </div>
          </a>
        </Link>
      ))}
    </div>
  )
}

export default PostThumb
