export interface GeoLocation {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  country: string;
  admin1?: string;
}

export interface CurrentWeather {
  temperature: number;
  apparent_temperature: number; // New field for RealFeel
  windspeed: number;
  weathercode: number;
  time: string;
  is_day: number;
  humidity: number;
}

export interface DailyForecast {
  time: string[];
  weathercode: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  sunrise: string[];
  sunset: string[];
}

export interface HourlyForecast {
  time: string[];
  temperature_2m: number[];
}

export interface WeatherData {
  current_weather: CurrentWeather;
  daily: DailyForecast;
  hourly: HourlyForecast;
}