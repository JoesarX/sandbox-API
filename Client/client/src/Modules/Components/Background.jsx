import React, { useEffect, useState } from 'react'
//images
import Clear from '../../assets/images/Clear.jpg'
import Fog from '../../assets/images/fog.png'
import Cloudy from '../../assets/images/Cloudy.jpg'
import Rainy from '../../assets/images/Rainy.jpg'
import Snow from '../../assets/images/snow.jpg'
import Stormy from '../../assets/images/Stormy.jpg'
import Sunny from '../../assets/images/Sunny.jpg'

const Background = ({iconString}) => {

  const [image, setImage] = useState(Clear)

  useEffect(() => {
    if (iconString) {
      if (iconString.toLowerCase().includes('sunny')) {
        setImage(Sunny)
      } else if (iconString.toLowerCase().includes('clouded')) {
        setImage(Cloudy)
      } else if (iconString.toLowerCase().includes('rainy') || iconString.toLowerCase().includes('shower')) {
        setImage(Rainy)
      } else if (iconString.toLowerCase().includes('snow')) {
        setImage(Snow)
      } else if (iconString.toLowerCase().includes('fog')) {
        setImage(Fog)
      } else if (iconString.toLowerCase().includes('thunder') || iconString.toLowerCase().includes('storm')) {
        setImage(Stormy)
      }
    }
  }, [iconString])

  return (
    <img src={image} alt="weather_image" className='h-screen w-full fixed left-0 top-0 -z-[10]' />
  )
}

export default Background