import Slider from 'react-slick'
import React from 'react'
import SliderPrevArrow from './prevArrow'
import SliderNextArrow from './nextArrow'

export const SliderCarousel = ({ children }) => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SliderNextArrow />,
    prevArrow: <SliderPrevArrow />,
  }
  return <Slider {...settings}>{children}</Slider>
}
