"use client";

import { useState } from "react";
import { Button } from "../components/ui/button";
import WeatherCard from "../components/WeatherCard";
import CityInput from "../components/CityInput";
import { Loader2, Search } from "lucide-react";
import { Weather } from "../utils/types";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchWeather = async (selectedCity: string) => {
    if (!selectedCity.trim()) {
      setError("Veuillez entrer le nom d'une ville.");
      return;
    }

    setLoading(true);
    setError(null);
    setShowSuggestions(false);
    try {
      const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${selectedCity},fr&units=metric&lang=fr&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("Ville non trouvée");
      }
      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <div className="flex space-x-2 mb-4">
          <CityInput
            city={city}
            setCity={setCity}
            fetchWeather={fetchWeather}
            showSuggestions={showSuggestions}
            setShowSuggestions={setShowSuggestions}
            loading={loading}
          />
          <Button
            onClick={() => fetchWeather(city)}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-500 text-white"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="h-4 w-4" />
            )}
          </Button>
        </div>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {weather && weather.weather && weather.weather[0] ? (
          <WeatherCard weather={weather} />
        ) : (
          <div className="text-center mt-4">
            <p className="text-lg text-indigo-800 animate-pulse">
              Entrez une ville pour consulter la météo en France !
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
