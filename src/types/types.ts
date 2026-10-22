export interface MeteoDailyListResponse {
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

export interface MeteoHourlyListResponse {
  latitude: number;
  longitude: number;
  elevation: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  hourly: {
    time: string[];
    temperature_2m: number[];
    weathercode: number[];
    relative_humidity_2m?: number[];
  };
  hourly_units: {
    temperature_2m: string;
    weathercode?: string;
    relative_humidity_2m?: string;
  };
}

export interface Hour {
  time: string; // Ex: "2026-09-27T14:00"
  label: string; // Ex: "14:00"
  meteo_data: {
    temp: number;
    weatherCode: number;
    humidity?: number;
    unit: string;
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

export interface DayWithHours {
  day: Day
  hours: Hour[];
}

export interface localData {
  daysWithHours: DayWithHours[]
  expiryTime: number
}

export interface MeteoContextType {
    days: Day[];
    hours: Hour[];
    loading: boolean;
    hoursloading: boolean;
    loadHours: (date: string) => void;
}