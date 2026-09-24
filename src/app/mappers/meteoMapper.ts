import { Day, MeteoListResponse } from "@/app/types/types";

export const mapMeteoListResponseToDays = (
  response: MeteoListResponse
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