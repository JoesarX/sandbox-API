import React from 'react';
import { useEffect, useState, useContext } from 'react'
import { Background, TarjetaClima, MiniCard } from './Modules/Components'
//import search from './assets/icons/search.svg'
import DatosClimaService from './Services/DatosClimaService';


function Home() {
  const [climaData, setClimaData] = useState([]);

  const [weather, setWeather] = useState({
    id: '',
    horaTomada: '',
    temperatura: '',
    humedad: '',
    brillo: '',
    lluvia: '',
  });

  const fetchAllData = async () => {
    console.log("hello")
    try {
      const data = await DatosClimaService.getAllData();
     // weather=data[0];
      setClimaData([data]);
      setWeather(data[0]);
      console.log(data[0])
      console.log(climaData)
      console.log(weather)
    } catch (error) {
      console.error(error);
    }

  };

  useEffect(() => {
    fetchAllData();
  }, []);
  return (
    <div className='w-full h-screen text-white px-8'>
      <nav className='w-full p-3 flex justify-between items-center'>
        <h1 className='font-bold tracking-wide text-3xl'>Weather App</h1>
        
      </nav>
      <Background></Background>
      <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
        <TarjetaClima
          place={"UNITEC Tegucigalpa"}
          humidity={weather.humedad}
          temperature={weather.temperatura}
        />
        <div className='flex justify-center gap-8 flex-wrap w-[60%]'>
        </div>
      </main >
    </div >
  );
}

export default Home;
