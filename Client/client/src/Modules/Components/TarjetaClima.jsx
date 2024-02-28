/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { useDate } from '../../Utils/useDate'
import sun from '../../assets/icons/sun.png'

import '../../index.css'

const TarjetaClima = ({
  temperature,
  humidity,
  place,

}) => {

  const [icon, setIcon] = useState(sun)
  const { time } = useDate()


  return (
    <div className='w-[22rem] min-w-[22rem] h-[30rem] glassCard p-4'>
      <div className='flex w-full just-center, items-center gap-4 mt-12 mb-4'>
        <img src={icon} alt="weather_icon" />
        <p className='font-bold text-5xl flex justify-center items-center' >{temperature} &deg;C</p>
      </div>
      <div className='font-bold text-center text-xl'>
        {place}
      </div>
      <div className='w-full flex justify-between items-center mt-4'>
        <p className='flex-1 text-center p-2'>{new Date().toDateString()}</p>
        <p className='flex-1 text-center p-2'>{time}</p>
      </div>
      <div className='w-full flex justify-between items-center mt-4 gap-4'>
        <p className='flex-1 text-center p-2 font-bold rounded-lg bg-green-600'>Humidity <p className='font-normal'>{humidity} gm/m&#179;</p></p>
      </div>
      <div className='w-full p-3 mt-4 flex justify-between items-center'>
        
      </div>
      <hr className='bg-slate-600' />
      
    </div>
  )
}

export default TarjetaClima