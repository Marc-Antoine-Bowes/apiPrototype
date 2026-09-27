import { MeteoHourlyListResponse, MeteoDailyListResponse } from "@/types/types";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

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
    const errorText = await response.text();
    throw new Error(`Erreur API (${response.status}): ${errorText}`);
  }

  const json: MeteoDailyListResponse = await response.json();
  return json;
  };

export async function getMeteoHours(
  latitude: number,
  longitude: number,
  date: string // Format "YYYY-MM-DD"
): Promise<MeteoHourlyListResponse> {
  const params = new URLSearchParams({
    latitude: latitude.toString(),
    longitude: longitude.toString(),
    hourly: "temperature_2m,weathercode,relative_humidity_2m",
    start_date: date,
    end_date: date,
    timezone: "auto",
  });

  const response = await fetch(`${BASE_URL}?${params.toString()}`);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Erreur API (${response.status}): ${errorText}`);
  }

  const json: MeteoHourlyListResponse = await response.json();
  return json;
  };