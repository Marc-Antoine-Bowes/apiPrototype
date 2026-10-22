// utils/weatherIcons.ts
import { Ionicons } from "@expo/vector-icons";

export type WeatherIconName = keyof typeof Ionicons.glyphMap;

export function getWeatherIcon(weatherCode: number): {
  name: WeatherIconName;
  color: string;
} {
  // Clear
  if (weatherCode === 0) {
    return { name: "sunny", color: "#F59E0B" }; // Soleil
  }

  // Mainly clear / partly cloudy
  if (weatherCode === 1 || weatherCode === 2) {
    return { name: "partly-sunny", color: "#FBBF24" };
  }

  // Overcast
  if (weatherCode === 3) {
    return { name: "cloudy", color: "#94A3B8" };
  }

  // Fog
  if (weatherCode === 45 || weatherCode === 48) {
    return { name: "cloudy", color: "#CBD5E1" };
  }

  // Drizzle
  if (weatherCode >= 51 && weatherCode <= 57) {
    return { name: "rainy", color: "#60A5FA" };
  }

  // Rain
  if (weatherCode >= 61 && weatherCode <= 67) {
    return { name: "rainy", color: "#3B82F6" };
  }

  // Snow
  if (weatherCode >= 71 && weatherCode <= 77) {
    return { name: "snow", color: "#93C5FD" };
  }

  // Rain showers
  if (weatherCode >= 80 && weatherCode <= 82) {
    return { name: "rainy", color: "#2563EB" };
  }

  // Snow showers
  if (weatherCode >= 85 && weatherCode <= 86) {
    return { name: "snow", color: "#BFDBFE" };
  }

  // Thunderstorm
  if (weatherCode >= 95 && weatherCode <= 99) {
    return { name: "thunderstorm", color: "#6366F1" };
  }

  // Fallback
  return { name: "partly-sunny", color: "#94A3B8" };
}