import CardHeader from './header'
import CardBody from './body'
import CardFooter from './footer'

const Card = ({ post }) => {
  return (
    <div className="relative p-2 mt-6 font-medium text-gray-500 bg-white border-2 border-gray-200 shadow-md rounded-2xl min-h-[90px]">
      <CardHeader post={post} />
      <CardBody post={post} />
      <CardFooter post={post} />
    </div>
  )
}

export default Card
