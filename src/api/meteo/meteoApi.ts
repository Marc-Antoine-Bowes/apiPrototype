import {
  MeteoHourlyListResponse,
  MeteoDailyListResponse,
  AirQualityResponse,
} from "@/types/types";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";
const AIR_QUALITY_URL = "https://air-quality-api.open-meteo.com/v1/air-quality";

export async function getMeteo(
  latitude: number,
  longitude: number
): Promise<MeteoDailyListResponse> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    daily: "weathercode,temperature_2m_max,temperature_2m_min",
    timezone: "auto",
  });

  const response = await fetch(`${BASE_URL}?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Erreur API (${response.status}): ${await response.text()}`);
  }
  return response.json();
}

export async function getMeteoHours(
  latitude: number,
  longitude: number,
  date: string
): Promise<MeteoHourlyListResponse> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    hourly: "temperature_2m,weathercode,relative_humidity_2m,uv_index",
    start_date: date,
    end_date: date,
    timezone: "auto",
  });

  const response = await fetch(`${BASE_URL}?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Erreur API (${response.status}): ${await response.text()}`);
  }
  return response.json();
}

export async function getAirQuality(
  latitude: number,
  longitude: number,
  date: string
): Promise<AirQualityResponse> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    hourly: "pm10,pm2_5,european_aqi,us_aqi",
    start_date: date,
    end_date: date,
    timezone: "auto",
  });

  const response = await fetch(`${AIR_QUALITY_URL}?${params.toString()}`);
  if (!response.ok) {
    throw new Error(`Erreur Air Quality (${response.status}): ${await response.text()}`);
  }
  return response.json();
}