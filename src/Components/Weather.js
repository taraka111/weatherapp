import React, { useState } from 'react';
import './Weather.css';
import { FaSearch, FaWind } from "react-icons/fa";
import { MdLocationOn } from 'react-icons/md';
import { WiHumidity } from 'react-icons/wi';

const Weather = () => {
    const [city, setCity] = useState('');
    const [forecast, setForecast] = useState([]);
    const [error, setError] = useState('');

    const API_KEY = "5acc1683650652bab831ecf7d57fd397";
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${API_KEY}`;

    function handleOnChange(event) {
        setCity(event.target.value);
    }

    async function fetchData() {
        try {
            let response = await fetch(url);
            let output = await response.json();
            if (response.ok) {
                const dailyForecast = output.list.filter(item => item.dt_txt.includes("12:00:00"));
                setForecast(dailyForecast);
                setError('');
            } else {
                setError('No data found. Please enter a valid city name.');
            }
        } catch (error) {
            setError('Failed to fetch data. Please try again.');
        }
    }

    return (
        <div>
            <div className='city'>
                <input type='text' value={city} onChange={handleOnChange} placeholder='Enter any city name'></input>
                <button onClick={() => fetchData()}>
                    <FaSearch />
                </button>
            </div>

            {error && <p className='error-message'>{error}</p>}
            {forecast && forecast.length > 0 &&
                <div className='forecast'>
                    {forecast.map((weatherItem, index) => {
                        const date = new Date(weatherItem.dt * 1000);
                        return (
                            <div className='forecast-item' key={index}>
                                <div className='weather-image'>
                                    <img src={`https://openweathermap.org/img/wn/${weatherItem.weather[0].icon}@2x.png`} alt={weatherItem.weather[0].description}></img>
                                    <h3 className='desc'>{weatherItem.weather[0].description}</h3>
                                </div>
                                <div className='weather-temp'>
                                    <h2>{weatherItem.main.temp}<span>&deg;C</span></h2>
                                </div>
                                <div className='weather-date'>
                                    <p>{date.toLocaleDateString()}</p>
                                </div>
                                <div className='weather-stats'>
                                    <div className='wind'>
                                        <div className='wind-icon'>
                                            <FaWind />
                                        </div>
                                        <h3 className='wind-speed'>{weatherItem.wind.speed}<span> Km/h</span></h3>
                                        <h3 className='wind-heading'>Wind Speed</h3>
                                    </div>
                                    <div className='humidity'>
                                        <div className='humidity-icon'>
                                            <WiHumidity />
                                        </div>
                                        <h3 className='humidity-percent'>{weatherItem.main.humidity}<span> %</span></h3>
                                        <h3 className='humidity-heading'>Humidity</h3>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
}

export default Weather;
