import { Hour, Day, MeteoDailyListResponse, MeteoHourlyListResponse, AirQualityResponse } from "@/types/types";

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
  response: MeteoHourlyListResponse,
  airQuality?: AirQualityResponse
): Hour[] => {
  const { time, temperature_2m, weathercode, relative_humidity_2m, uv_index } =
    response.hourly;
  const unit = response.hourly_units?.temperature_2m ?? "°C";

  return time.map((timeStr, index) => {
    const dateObj = new Date(timeStr);
    const hourLabel = new Intl.DateTimeFormat("fr-CA", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    }).format(dateObj);

    // Trouver l’index correspondant dans air quality (même timestamp)
    const aqIndex = airQuality?.hourly.time.findIndex((t) => t === timeStr) ?? -1;

    return {
      time: timeStr,
      label: hourLabel,
      meteo_data: {
        temp: Math.round(temperature_2m[index]),
        weatherCode: weathercode[index],
        humidity: relative_humidity_2m?.[index],
        uvIndex: uv_index?.[index] != null ? Math.round(uv_index[index] * 10) / 10 : undefined,
        aqi: aqIndex >= 0 ? airQuality?.hourly.european_aqi?.[aqIndex] : undefined,
        pm25: aqIndex >= 0 ? airQuality?.hourly.pm2_5?.[aqIndex] : undefined,
        unit,
      },
    };
  });
};