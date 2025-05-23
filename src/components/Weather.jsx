import React, { useEffect, useRef, useState } from 'react'
import "./Weather.css"
import search_icon from "../assets/search.png"
import clear_icon from "../assets/clear.png"
import cloud_icon from "../assets/cloud.png"
import drizzle_icon from "../assets/drizzle.png"
import humidity_icon from "../assets/humidity.png"
import rain_icon from "../assets/rain.png"
import snow_icon from "../assets/snow.png"
import wind_icon from "../assets/wind.png"







const Weather = () =>{

    const inputref = useRef()

    const [weatherData, setweatherData] = useState(null);

    const allicons = {
        "01d": clear_icon,
        "01n": clear_icon,
        "02d": cloud_icon,
        "02n": cloud_icon,
        "03d": cloud_icon,
        "03n": cloud_icon,
        "04d": drizzle_icon,
        "04n": drizzle_icon,
        "09d": rain_icon,
        "09n": rain_icon,
        "10d": rain_icon,
        "10n": rain_icon,
        "13d": snow_icon,
        "13n": snow_icon,

    }

    const searchcity = async(city)=>{
        if (!city || city.trim() === "") {
            alert("Enter city name");   
            return;
          }
          
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_WAPI}`;


            const response = await fetch(url)
            const data = await response.json()

            if(!response.ok){
                alert(data.message);
                return;
            }

            const icon = allicons[data.weather[0].icon] || clear_icon;
            setweatherData({
                humidity: data.main.humidity,
                WindSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,

            })

        } catch (error) {
            setweatherData(false)
            console.error("error in fecthing weather data",error)
          }
          
    }

    useEffect(()=>{
        searchcity("London")
    },[])


  return (
        <div className='Weather'>
            <div className='search'>     
                <input  ref={inputref}type="text" placeholder='search here' />
                <img src={search_icon} alt=""  onClick={()=>searchcity(inputref.current.value)}/>
            </div>
            {weatherData?<>
                <img src={clear_icon} alt="" className='Weather_clear'/>
            <p className='temp'>{weatherData.temperature}°c</p>
            <p className='location'>{weatherData.location}</p>
            <div className='weather-data'>
                <div className="col">
                    <img src={humidity_icon} alt="" />
                    <div>
                        <p>{weatherData.humidity} %</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind_icon} alt="" />
                    <div>
                        <p>{weatherData.WindSpeed} km/h</p>
                        <span>wind speed</span>
                    </div>
                </div>
            </div>
        

            </>:<></>}

        </div>
  )
}

export default Weather 