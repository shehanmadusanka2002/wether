import React, { useState } from "react";
import { FaSearch, FaWind } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import "../index.css";

const API_KEY = "53d691ddd392e3fa19dc64cc8eba0027"; // Replace with your OpenWeatherMap key

function CardWhether() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    if (!city.trim()) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        alert("City not found!");
        setWeather(null);
      }
    } catch (error) {
      alert("Error fetching weather data.", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white bg-opacity-20 backdrop-blur-md p-8 rounded-3xl w-full max-w-md text-white shadow-2xl transition duration-300 ease-in-out">
        <div className="flex items-center bg-white bg-opacity-30 rounded-full px-4 py-2 mb-6 shadow-inner">
          <input
            type="text"
            placeholder="Enter city name..."
            className="bg-transparent focus:outline-none flex-grow text-black placeholder-white text-lg"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            onClick={fetchWeather}
            className="text-white hover:text-yellow-300 transition duration-200"
            title="Search"
          >
            <FaSearch size={20} />
          </button>
        </div>

        {weather && weather.main && (
          <div className="text-center">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
              alt="Weather Icon"
              className="mx-auto mb-2"
            />
            <h1 className="text-5xl font-bold mb-2">{Math.round(weather.main.temp)}°C</h1>
            <h2 className="text-2xl font-medium">{weather.name}</h2>
            <p className="text-sm italic text-white/80 mb-4 capitalize">
              {weather.weather[0].description}
            </p>

            <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
              <div className="flex items-center justify-center bg-white/10 p-3 rounded-xl">
                <WiHumidity size={28} className="mr-2" />
                <span>{weather.main.humidity}%</span>
              </div>
              <div className="flex items-center justify-center bg-white/10 p-3 rounded-xl">
                <FaWind size={22} className="mr-2" />
                <span>{weather.wind.speed} km/h</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CardWhether;
