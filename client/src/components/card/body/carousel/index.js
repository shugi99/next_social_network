// import Slider from '@components/slider'
import Slider from 'react-slick'
import React from 'react'
import { useSelector } from 'react-redux'
import { SliderCarousel } from '@components/slider'

function SampleNextArrow(props) {
  const { className, style, onClick } = props
  return <div className={className} style={{ ...style, display: 'block', background: 'red' }} onClick={onClick} />
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props
  return <div className={className} style={{ ...style, display: 'block', background: 'green' }} onClick={onClick} />
}

const Carousel = ({ images, id }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  }
  return (
    // <Slider autoPlay={false} pauseOnHover={false} extralargeCount={1} largeCount={1} middleCount={1} centerMode={false}>
    <SliderCarousel>
      {images.map((img, index) => (
        <div key={index} className="w-full h-[400px] lg:h-[600px]">
          <img src={img.url} className="object-contain w-full h-full" alt={img.url} />
        </div>
      ))}
    </SliderCarousel>
  )
}

export default Carousel
