import React, { useEffect, useState } from 'react'
//images
import Clear from '../../assets/images/Clear.jpg'
import Cloudy from '../../assets/images/Cloudy.jpg'
import Rainy from '../../assets/images/Rainy.jpg'
import Sunny from '../../assets/images/Sunny.jpg'

const Background = ({iconString}) => {

  const [image, setImage] = useState(Clear)

  useEffect(() => {
    if (iconString) {
      if (iconString.toLowerCase().includes('sunny')) {
        setImage(Sunny)
      } else if (iconString.toLowerCase().includes('clouded')) {
        setImage(Cloudy)
      } else if (iconString.toLowerCase().includes('rainy')) {
        setImage(Rainy)
      }
    }
  }, [iconString])

  return (
    <img src={image} alt="weather_image" className='h-screen w-full fixed left-0 top-0 -z-[10]' />
  )
}

export default Background