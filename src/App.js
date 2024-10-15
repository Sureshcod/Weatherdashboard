import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchComponent from "./components/SearchComponent";
import WeatherDisplay from "./components/WeatherDisplay";
import Favorites from "./components/Favorites";
import "./App.css";
import "./tailwind.css";

const App = () => {
  const [lastSearchedCity, setLastSearchedCity] = useState("");
  const [data, setData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isCelsius, setIsCelsius] = useState(true);

  const handleSearch = async (city) => {
    await fetchWeather(city);
    setLastSearchedCity(city);
  };

  const fetchWeather = async (city) => {
    try {
      const apiKey = "589301c98ed689dcbe25192fd2680b4a";
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );

      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
      );

      setData({ currentWeather: weatherResponse.data });
      setForecast(forecastResponse.data.list);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      const response = await axios.get("http://localhost:5000/favorites");
      setFavorites(response.data);
    };
    fetchFavorites();
  }, []);

  const addFavorite = async (city) => {
    try {
      const favoriteData = {
        name: city,
        weatherData: data.currentWeather,
      };
      const response = await axios.post(
        "http://localhost:5000/favorites",
        favoriteData
      );
      setFavorites([...favorites, response.data]);
    } catch (error) {
      console.error("Error adding favorite:", error);
    }
  };

  const deleteFavorite = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/favorites/${id}`);
      setFavorites(favorites.filter((fav) => fav.id !== id));
    } catch (error) {
      console.error("Error deleting favorite:", error);
    }
  };

  // const toggleTemperatureUnit = () => {
  //   setIsCelsius(!isCelsius);
  // };

  return (
    <div
      class="bg-green-300  
                mx-44 
                space-y-4  
                p-4 
                justify-between"
    >
      <h1 class="mx-2 my-2 text-4xl font-extrabold dark:text-black text-center">
        Check How is Weather
      </h1>
      <SearchComponent onSearch={handleSearch} />
      <h2 class="text-lg mx-2 my-2 font-medium  text-gray-900 dark:text-white">
        Last Searched City : {lastSearchedCity}
      </h2>
      {/* <button
        type="button"
        class="text-gray-900 m-2 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        onClick={toggleTemperatureUnit}
      > */}
      {/* Switch to {isCelsius ? "Fahrenheit" : "Celsius"}
      </button> */}
      {data && (
        <WeatherDisplay
          data={data}
          forecast={forecast}
          isCelsius={isCelsius}
          toggleUnit={() => setIsCelsius(!isCelsius)}
        />
      )}
      {data && (
        <button
          type="button"
          class="text-black bg-white from-red-400 via-red-500 m-2 to-red-600 hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          onClick={() => addFavorite(lastSearchedCity)}
        >
          Add to Favorites ❤️
        </button>
      )}
      {favorites.length > 0 && (
        <Favorites favorites={favorites} deleteFavorite={deleteFavorite} />
      )}
    </div>
  );
};

export default App;
