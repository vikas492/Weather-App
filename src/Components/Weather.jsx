import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.webp';
import clear_icon from '../assets/clear.webp';
import humidity_icon from '../assets/humidity.webp';
import wind_icon from '../assets/wind_speed.webp';


const Weather = () => { 
const [weatherData, setWeatherData] = useState(false);
const inputRef = useRef();
const search = async (city) => {
  if(city === "") {
    alert("Please enter a city name");
    return;
  }
  try {
   const  url = `https://api.weatherapi.com/v1/current.json?key=399a87730694474e89a81022242906&q=${city}&aqi=no`;
    const response = await fetch(url);
    const data = await response.json();
    if(data.error) {
      alert("City not found");
      return;
    }
    console.log(data);
    setWeatherData({
        temp: data.current.temp_c,
        location: data.location.name,
        country: data.location.country,
        icon: data.current.condition.icon,
        condition: data.current.condition.text,
        humidity: data.current.humidity,
        wind: data.current.wind_kph,
    });
  } catch (error) {
    
  }
}

useEffect(() => {
  search("maharashtra"); 
}, []);

  return (
    <div className='weather'>
      <div className="search-bar">
        <input ref={inputRef} type='text' placeholder='search'/>
        <img src= {search_icon} alt='search-icon' onClick={()=>search(inputRef.current.value)} />
      </div>
      <img src={weatherData.icon} alt='weather-icon' className='weather-icon'/>
      <p className='Temperature'>{weatherData.temp}°C</p>
      <p className='Location'>{weatherData.location}</p>
      <div className='weather-data'>
        <div className='col'>
          <img src={humidity_icon} alt=''/>
          <div>
            <p>{weatherData.humidity} %</p>
            <span>Humidity</span>
          </div>
        </div>
         <div className='col'>
          <img src={wind_icon} alt=''/>
          <div>
            <p>{weatherData.wind}km/hr</p>
            <span>wind speed</span>
          </div>
        </div>
        </div>  
    </div>
  )
}

export default Weather