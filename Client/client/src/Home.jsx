import React from 'react';
import { useEffect, useState, useContext } from 'react'
import { Background, TarjetaClima, MiniCard } from './Modules/Components'
//import search from './assets/icons/search.svg'
import DatosClimaService from './Services/DatosClimaService';


function Home() {
  const [climaData, setClimaData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [weather, setWeather] = useState({
    brillo: '',
    dia: '',
    humedad: '',
    lluvia: '',
    temperatura: '',
  });



  const currentDate = new Date();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


  const fetchAllData = async () => {
    try {
      const data = await DatosClimaService.getAllData();
      // weather=data[0];
      setClimaData(data);
     
      const currentDayOfWeek = daysOfWeek[currentDate.getDay()];
      const currentDayData = data.find(obj => obj.dia === currentDayOfWeek);
      setWeather(currentDayData);

    } catch (error) {
      console.error(error);
    }

  };

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    console.log("weather state:", weather);

  }, [weather]);

  useEffect(() => {
    const currentDayOfWeek = daysOfWeek[currentDate.getDay()];
    setFilteredData(climaData.filter(obj => obj.dia !== currentDayOfWeek));
  }, [climaData]);

  useEffect(() => {
    console.log("filteredData state:", filteredData);
  }, [filteredData]);



  const calculateWeatherCondition = (number) => {
    if (number >= 0 && number <= 33) {
      return "Sunny";
    } else if (number >= 34 && number <= 66) {
      return "Rainy";
    } else {
      return "Clouded";
    }
  };

  return (
    <div className='w-full h-screen text-white px-8'>
      <nav className='w-full p-3 flex justify-between items-center'>
        <h1 className='font-bold tracking-wide text-3xl'>Weather App</h1>

      </nav>
      <Background iconString={calculateWeatherCondition(weather.brillo)} />
      <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
        <TarjetaClima
          place={"UNITEC Tegucigalpa"}
          humidity={weather.humedad}
          temperature={weather.temperatura}
          iconString={calculateWeatherCondition(weather.brillo)}
        />
        <div className='flex justify-center gap-8 flex-wrap w-[60%]'>
          {
            filteredData?.slice(0, 8).map(curr => {
              return (
                <MiniCard
                  key={curr.dia}
                  time={curr.dia}
                  temp={curr.temperatura}
                  iconString={calculateWeatherCondition(curr.brillo)}
                />
              )
            })
          }
        </div>
      </main >
    </div >
  );
}

export default Home;
