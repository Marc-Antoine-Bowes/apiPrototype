import { Hour, Day, MeteoDailyListResponse, MeteoHourlyListResponse } from "@/types/types";

export const mapMeteoListResponseToDays = (
  response: MeteoDailyListResponse
): Day[] => {
  const { time, temperature_2m_max, temperature_2m_min, weathercode } =
    response.daily;
  const unit = response.daily_units.temperature_2m_max ?? "°C";

  return time.map((dateStr, index) => {
    const dateObj = new Date(dateStr);
    
    const dayName = new Intl.DateTimeFormat("fr-CA", { weekday: "long" }).format(
      dateObj
    );

    return {
      name: dayName.charAt(0).toUpperCase() + dayName.slice(1),
      date: dateStr,
      meteo_data: {
        tempMax: Math.round(temperature_2m_max[index]),
        tempMin: Math.round(temperature_2m_min[index]),
        weatherCode: weathercode[index],
        unit,
      },
    };
  });
};

export const mapMeteoListResponseToHours = (
  response: MeteoHourlyListResponse
): Hour[] => {
  const { time, temperature_2m, weathercode, relative_humidity_2m } =
    response.hourly;
  const unit = response.hourly_units?.temperature_2m ?? "°C";

  return time.map((timeStr, index) => {
    // timeStr est au format ISO / chaîne locale renvoyée par l'API (ex: "2026-09-27T14:00")
    const dateObj = new Date(timeStr);

    // Formate l'heure en format 24h (ex: "14h" ou "14:00")
    const hourLabel = new Intl.DateTimeFormat("fr-CA", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    }).format(dateObj);

    return {
      time: timeStr,
      label: hourLabel,
      meteo_data: {
        temp: Math.round(temperature_2m[index]),
        weatherCode: weathercode[index],
        humidity: relative_humidity_2m ? relative_humidity_2m[index] : undefined,
        unit,
      },
    };
  });
};