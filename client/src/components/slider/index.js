// import Slider from '@components/slider'
import Slider from 'react-slick'
import React from 'react'
import { useSelector } from 'react-redux'
import SliderPrevArrow from './prevArrow'
import SliderNextArrow from './nextArrow'

function SampleNextArrow(props) {
  const { className, style, onClick } = props
  return <div className={className} style={{ ...style, display: 'block', background: 'red' }} onClick={onClick} />
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props
  return <div className={className} style={{ ...style, display: 'block', background: 'green' }} onClick={onClick} />
}

export const SliderCarousel = ({ children }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SliderNextArrow />,
    prevArrow: <SliderPrevArrow />,
  }
  return (
    // <Slider autoPlay={false} pauseOnHover={false} extralargeCount={1} largeCount={1} middleCount={1} centerMode={false}>
    <Slider {...settings}>{children}</Slider>
  )
}
