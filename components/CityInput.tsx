/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { Input } from "../components/ui/input";
import { ScrollArea } from "../components/ui/scroll-area";
import { Loader2 } from "lucide-react";
import debounce from "lodash/debounce";

type City = string;

export default function CityInput({
  city,
  setCity,
  fetchWeather,
  showSuggestions,
  setShowSuggestions,
  loading,
}: {
  city: string;
  setCity: (city: string) => void;
  fetchWeather: (city: string) => void;
  showSuggestions: boolean;
  setShowSuggestions: (show: boolean) => void;
  loading: boolean;
}) {
  const [cities, setCities] = useState<City[]>([]);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCities = async () => {
      const response = await fetch("/communes_france.json");
      const data = await response.json();
      setCities(data);
    };

    fetchCities();
  }, []);

  const filterCities = useCallback(
    debounce((searchTerm: string) => {
      if (searchTerm.length > 0) {
        const filtered = cities
          .filter((c) => c.toLowerCase().startsWith(searchTerm.toLowerCase()))
          .sort((a, b) => a.localeCompare(b)); // Tri des résultats en ordre alphabétique
        setFilteredCities(filtered);
      } else {
        setFilteredCities([]);
      }
    }, 300),
    [cities]
  );

  useEffect(() => {
    filterCities(city);
    setSelectedIndex(-1); // Réinitialiser l'index sélectionné à chaque nouvelle recherche
  }, [city, filterCities]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowSuggestions]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      // Naviguer vers le bas dans la liste
      setSelectedIndex((prevIndex) =>
        Math.min(prevIndex + 1, filteredCities.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      // Naviguer vers le haut dans la liste
      setSelectedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      // Sélectionner la ville en surbrillance
      const selectedCity = filteredCities[selectedIndex];
      setCity(selectedCity);
      setShowSuggestions(false);
      fetchWeather(selectedCity);
    } else if (e.key === "Enter" && !loading && selectedIndex === -1) {
      fetchWeather(city);
      setShowSuggestions(false);
    }
  };

  return (
    <div ref={inputRef} className="relative flex-grow">
      <div className="relative">
        <Input
          type="text"
          placeholder="Entrez une ville"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          className="w-full pr-10 bg-white"
        />
        {loading && (
          <Loader2 className="absolute right-2 top-2 h-4 w-4 animate-spin text-indigo-600" />
        )}
      </div>
      {showSuggestions && filteredCities.length > 0 && (
        <ScrollArea
          className="absolute z-10 w-full max-h-[200px] mt-1 bg-white border border-gray-200 rounded-md shadow-lg overflow-auto"
          style={{ position: "absolute", top: "100%", left: 0 }}
        >
          {filteredCities.map((cityName, index) => (
            <div
              key={cityName}
              className={`px-4 py-2 hover:bg-indigo-100 cursor-pointer transition-colors duration-150 ease-in-out ${
                index === selectedIndex ? "bg-indigo-100" : ""
              }`}
              onClick={() => {
                setCity(cityName);
                setShowSuggestions(false);
                fetchWeather(cityName);
              }}
            >
              {cityName}
            </div>
          ))}
        </ScrollArea>
      )}
    </div>
  );
}
