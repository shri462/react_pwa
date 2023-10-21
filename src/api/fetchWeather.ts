import axios from "axios";

const URL = import.meta.env.VITE_REACT_APP_WEATHER_URL;
const API_KEY = import.meta.env.VITE_REACT_APP_API_KEY;

export type WeatherData = {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

export type WeatherError = {
  message: string;
  code: number;
};

export const fetchWeather = async (
  query: string
): Promise<{ data: WeatherData | null; error: WeatherError | null }> => {
  try {
    const { data } = await axios.get(URL, {
      params: {
        q: query,
        units: "metric",
        APPID: API_KEY,
      },
    });
    return { data, error: null };
  } catch (error) {
    console.log(error);
    const err = {
      message:
        error.response.data.message === "city not found"
          ? "Oops! City not found on the Earth. 🌎"
          : error.response.data.message ??
            "Oops! The weather data is hiding behind some clouds. We'll work our magic and have it back for you shortly. ☁️⛅",
      code: error.code || 500,
    };
    return { data: null, error: err };
  }
};
