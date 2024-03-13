/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import sun from '../../assets/icons/sun.png'
import cloud from '../../assets/icons/cloud.png'
import rain from '../../assets/icons/rain.png'
import fog from '../../assets/icons/fog.png'
import snow from '../../assets/icons/snow.png'
import storm from '../../assets/icons/storm.png'
import wind from '../../assets/icons/windy.png'


const MiniCard = ({ time, temp, iconString }) => {
  const [icon, setIcon] = useState()
 
  useEffect(() => {
    
    if (iconString) {
      if (iconString.toLowerCase().includes('clouded')) {
        setIcon(cloud)
      } else if (iconString.toLowerCase().includes('rainy')) {
        setIcon(rain)
      } else if (iconString.toLowerCase().includes('sunny')) {
        setIcon(sun)
      } 
    }
  }, [iconString])
  return (
    <div className='glassCard w-[10rem] h-[10rem] p-4 flex flex-col'>
      <p className='text-center'>
        {time}
      </p>
      <hr />
      <div className='w-full flex justify-center items-center flex-1'>
        <img src={icon} alt="forecast not available" className='w-[4rem] h-[4rem]' />
      </div>
      <p className='text-center font-bold'>{temp}&deg;C</p>
    </div>
  )
}

export default MiniCard