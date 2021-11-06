// import Slider from '@components/slider'
import React, { useState } from 'react'

const CardBody = ({ post }) => {
  //   const post = {
  //     content:
  //       '123456789012345678901234567890123456789012345678901234567890a123456789012345678901234567890123456789012345678901234567890a123456789012345678901234567890123456789012345678901234567890a123456789012345678901234567890123456789012345678901234567890a123456789012345678901234567890123456789012345678901234567890a123456789012345678901234567890123456789012345678901234567890a123456789012345678901234567890123456789012345678901234567890a',
  //   }

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

      {/* {post.images.length > 0 && <Carousel />} */}
      {/* <Slider dots={true} largeCount={4} smallCount={2}>
        {data.map((post) => (
          <div>1</div>
        ))}
      </Slider> */}
    </div>
  )
}

export default CardBody
