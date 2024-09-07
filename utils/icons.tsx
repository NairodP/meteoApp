/* eslint-disable @next/next/no-img-element */
import {
  Sun,
  CloudSun,
} from "lucide-react";

type Weather = {
  weather: {
    icon: string;
    description: string;
  }[];
};

// Fonction pour récupérer l'icône appropriée
export function getWeatherIcon(weather: Weather) {
  const { icon, description } = weather.weather[0];

  // Style pour les icônes Lucide React
  const iconStyle = {
    width: "60px",  
    height: "60px", 
    marginRight: "20px", 
    color: "#ffb703", 
  };

  // Vérifier les conditions spécifiques pour utiliser Lucide React
  if (description.toLowerCase() === "few clouds" || description.toLowerCase() === "nuageux") {
    return <CloudSun style={iconStyle} />;
  } else if (description.toLowerCase() === "clear sky" || description.toLowerCase() === "ciel dégagé") {
    return <Sun style={iconStyle} />;
  }

  // Utiliser l'icône de l'API pour les autres conditions
  return <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={description} />;
}
