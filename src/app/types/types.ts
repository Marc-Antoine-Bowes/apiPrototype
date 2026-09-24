export default interface MeteoListResponse {
  latitude: number;
  longitude: number;
  elevation: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
  };
  daily_units: {
    temperature_2m_max: string;
    temperature_2m_min: string;
  };
}

export interface Meteo {
  tempMax: number;
  tempMin: number;
  weatherCode: number;
  unit: string;
}

export interface Day {
  name: string;      
  date: string;      
  meteo_data: Meteo;
}

export const Days : Day[] = [];