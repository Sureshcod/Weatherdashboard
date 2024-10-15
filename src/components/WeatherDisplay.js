import React from "react";

const WeatherDisplay = ({ data, forecast, isCelsius, toggleUnit }) => {
  if (!data || !data.currentWeather) {
    return <div>Please search for a city to see the weather data.</div>;
  }

  const { currentWeather } = data;

  const temperature = isCelsius
    ? currentWeather.main.temp
    : (currentWeather.main.temp * 9) / 5 + 32;

  const dailyForecast = forecast.filter((item) =>
    item.dt_txt.includes("12:00:00")
  );

  return (
    <div className="weather-display">
      <h2>{currentWeather.name}</h2>
      <p>{currentWeather.weather[0].description}</p>
      <p>
        Temperature: {temperature.toFixed(2)}° {isCelsius ? "C" : "F"}
      </p>
      <p>Humidity: {currentWeather.main.humidity}%</p>
      <button
        class="text-gray-900 m-2 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        onClick={toggleUnit}
      >
        Switch to {isCelsius ? "Fahrenheit" : "Celsius"}
      </button>

      <h3>5-Day Forecast</h3>
      <div className="forecast">
        {dailyForecast.map((day, index) => (
          <div key={index} className="forecast-day">
            <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
            <p>{day.weather[0].description}</p>
            <p>
              Temp:{" "}
              {isCelsius
                ? day.main.temp.toFixed(2)
                : ((day.main.temp * 9) / 5 + 32).toFixed(2)}
              ° {isCelsius ? "C" : "F"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherDisplay;
