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
    uv_index?: number[];
  };
  hourly_units: {
    temperature_2m: string;
    weathercode?: string;
    relative_humidity_2m?: string;
  };
}


export interface Hour {
  time: string;
  label: string;
  meteo_data: {
    temp: number;
    weatherCode: number;
    humidity?: number;
    uvIndex?: number;
    aqi?: number;        
    pm25?: number;
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
    hoursByDate: HoursByDate;
    loading: boolean;
    hoursloading: boolean;
    loadHours: (date: string) => void;
    locationError: string | null;
}

// Nouveau type
export interface AirQualityResponse {
  latitude: number;
  longitude: number;
  hourly: {
    time: string[];
    pm10?: number[];
    pm2_5?: number[];
    european_aqi?: number[];
    us_aqi?: number[];
  };
}

export type HoursByDate = Record<string, Hour[]>;

export interface CachedMeteo {
  expiryTime: number; // timestamp en ms
  coordsKey: string;
  days: Day[];
  hoursByDate: HoursByDate;
}