import CardHeader from './header'
import CardBody from './body'
import CardFooter from './footer'
import Comments from './comment'
import InputComment from './input-comment'

const Card = ({ post }) => {
  console.log(post)
  return (
    <div className="relative my-10 font-medium text-gray-500 bg-white border-2 border-gray-200 shadow-md rounded-2xl min-h-[90px]">
      <CardHeader post={post} />
      <CardBody post={post} />
      <CardFooter post={post} />
      <Comments post={post} />
      <InputComment post={post} />
    </div>
  )
}

export default Card
