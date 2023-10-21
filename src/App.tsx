import "./App.css";
import { useState } from "react";
import { WeatherData, fetchWeather } from "./api/fetchWeather";

function App() {
  const [query, setQuery] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const search = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const data = await fetchWeather(query);
      setWeatherData(data);
      setQuery("");
    }
  };

  return (
    <div className="main-container">
      <input
        type="text"
        name="query"
        id="query"
        placeholder="Search..."
        className="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={search}
      />

      {weatherData?.main && (
        <div className="city">
          <h2 className="city-name">
            <span>{weatherData.name}</span>
            <sup>{weatherData.sys.country}</sup>
          </h2>
          <div className="city-temp">
            {Math.round(weatherData.main.temp)}
            <sup>&deg;C</sup>
          </div>
          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              alt={weatherData.weather[0].description}
            />
            <p>{weatherData.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
