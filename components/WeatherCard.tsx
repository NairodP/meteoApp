import { Thermometer, Droplets, Wind, Cloud } from "lucide-react";
import { Weather } from "../utils/types";
import { getWeatherIcon } from "../utils/icons";
import WeatherInfo from "./WeatherInfo";

type WeatherCardProps = {
  weather: Weather;
};

export default function WeatherCard({ weather }: WeatherCardProps) {
  const weatherIcon = getWeatherIcon(weather);

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mb-2 text-indigo-800">
        {weather.name}
      </h2>
      <div className="flex justify-center items-center mb-4">
        {weatherIcon}
        <p className="text-5xl font-bold ml-4 text-indigo-800">
          {Math.round(weather.main.temp)}°C
        </p>
      </div>
      <p className="text-xl mb-4 capitalize text-indigo-700">
        {weather.weather[0].description}
      </p>
      <div className="grid grid-cols-2 gap-4">
        <WeatherInfo
          icon={<Thermometer className="h-6 w-6 text-indigo-600" />}
          label="Ressenti"
          value={`${Math.round(weather.main.feels_like)}°C`}
        />
        <WeatherInfo
          icon={<Droplets className="h-6 w-6 text-indigo-600" />}
          label="Humidité"
          value={`${weather.main.humidity}%`}
        />
        <WeatherInfo
          icon={<Wind className="h-6 w-6 text-indigo-600" />}
          label="Vent"
          value={`${Math.round(weather.wind.speed * 3.6)} km/h`}
        />
        <WeatherInfo
          icon={<Cloud className="h-6 w-6 text-indigo-600" />}
          label="Pression"
          value={`${weather.main.pressure} hPa`}
        />
      </div>
    </div>
  );
}
