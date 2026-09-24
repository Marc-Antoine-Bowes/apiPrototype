import { MeteoListResponse } from "@/app/types/types";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export async function getMeteo(
  latitude: number,
  longitude: number
): Promise<MeteoListResponse> {
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

  const json: MeteoListResponse = await response.json();
  return json;
  };