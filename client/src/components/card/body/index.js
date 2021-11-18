// import Slider from '@components/slider'
import React, { useState } from 'react'
import Carousel from './carousel'

const CardBody = ({ post }) => {
  const data = [{ name: 'post' }, { name: 'post' }, { name: 'post' }]
  const [readMore, setReadMore] = useState(false)
  return (
    <div className="p-4 break-all ">
      <div>
        {post.content.length < 60 ? post.content : readMore ? post.content + '' : post.content.slice(0, 250) + '...'}
      </div>
      {post.content.length > 60 && (
        <div onClick={() => setReadMore(!readMore)}>{readMore ? 'Hide content' : 'Read More'}</div>
      )}

      {post.images.length > 0 && <Carousel images={post.images} id={post._id} />}

      {/* <Slider dots={true} largeCount={4} smallCount={2}>
        {data.map((post) => (
          <div>1</div>
        ))}
      </Slider> */}
    </div>
  )
}

export default CardBody
