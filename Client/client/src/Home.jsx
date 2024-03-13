import React from 'react';
import { useEffect, useState, useContext } from 'react'
import { Background, TarjetaClima, MiniCard } from './Modules/Components'
//import search from './assets/icons/search.svg'
import DatosClimaService from './Services/DatosClimaService';


function Home() {
  const [climaData, setClimaData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [weather, setWeather] = useState({
    id:'',
    brillo: '',
    dia: '',
    humedad: '',
    lluvia: '',
    temperatura: '',
  });
  const sortSemana = (a, b) => {
    const dayIndexA = daysOfWeek.indexOf(a.dia);
    const dayIndexB = daysOfWeek.indexOf(b.dia);
    
    return dayIndexA - dayIndexB;
  };


  const currentDate = new Date();
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


  const fetchAllData = async () => {
    try {
      const data = await DatosClimaService.getAllData();
      // weather=data[0];
      setClimaData(data);
      console.log("primero: " + JSON.stringify(data));
      const currentDayOfWeek = daysOfWeek[currentDate.getDay()];
      const currentDayData = data.find(obj => obj.dia === currentDayOfWeek);
      console.log(currentDayData)
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
    const sortedFilteredData = climaData.filter(obj => obj.dia !== currentDayOfWeek)
                                      .sort(sortSemana);
    setFilteredData(sortedFilteredData);
  }, [climaData]);

  useEffect(() => {
    console.log("filteredData state:", filteredData);
  }, [filteredData]);



  const calculateWeatherCondition = (number,lluvia) => {
    console.log(number)
    if(lluvia === 0 || lluvia === 0.0){
      console.log("no llueve")
      return "Rainy";
     }else if (number >= 500 && number <= 1200) {
      console.log("sol")
      return "Sunny";
    } else if (number >= 0 && number <= 499) {
      console.log("nublado")
      return "Clouded";
    } 
  };

  return (
    <div className='w-full h-screen text-white px-8'>
      <nav className='w-full p-3 flex justify-between items-center'>
        <h1 className='font-bold tracking-wide text-3xl'>Sonda de Clima</h1>

      </nav>
      <Background iconString={calculateWeatherCondition(weather?.brillo,weather?.lluvia)} />
      <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
        <TarjetaClima
          place={"UNITEC Tegucigalpa"}
          humidity={weather?.humedad}
          temperature={weather?.temperatura}
        //  iconString={calculateWeatherCondition(weather?.brillo,weather?.lluvia)}
        />
        <div className='flex justify-center gap-8 flex-wrap w-[60%]'>
          {
            filteredData?.slice(0, 8).map(curr => {
              return (
                <MiniCard
                  key={curr.id}
                  time={curr.dia}
                  temp={curr.temperatura}
                  iconString={calculateWeatherCondition(curr.brillo,curr.lluvia)}
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
