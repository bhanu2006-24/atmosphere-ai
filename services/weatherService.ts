import { GeoLocation, WeatherData } from '../types';

const GEO_API_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API_URL = 'https://api.open-meteo.com/v1/forecast';

export const searchLocation = async (query: string): Promise<GeoLocation[]> => {
  if (!query || query.length < 2) return [];
  
  try {
    const response = await fetch(`${GEO_API_URL}?name=${encodeURIComponent(query)}&count=5&language=en&format=json`);
    if (!response.ok) return [];
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Error searching location:", error);
    return [];
  }
};

export const getWeather = async (lat: number, lon: number): Promise<WeatherData | null> => {
  try {
    const params = new URLSearchParams({
      latitude: lat.toString(),
      longitude: lon.toString(),
      // Added apparent_temperature
      current: 'temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,is_day,apparent_temperature',
      hourly: 'temperature_2m,relative_humidity_2m,weather_code',
      daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset',
      timezone: 'auto',
    });

    const response = await fetch(`${WEATHER_API_URL}?${params.toString()}`);
    
    if (!response.ok) throw new Error('Weather fetch failed');
    
    const data = await response.json();
    
    // Validate critical data structure
    if (!data.current || !data.hourly || !data.daily) {
      console.error("Incomplete weather data received", data);
      return null;
    }
    
    return {
      current_weather: {
        temperature: data.current.temperature_2m,
        apparent_temperature: data.current.apparent_temperature,
        windspeed: data.current.wind_speed_10m,
        weathercode: data.current.weather_code,
        time: data.current.time,
        is_day: data.current.is_day,
        humidity: data.current.relative_humidity_2m
      },
      daily: data.daily,
      hourly: data.hourly
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
};

export const getWeatherIcon = (code: number, isDay: number = 1): string => {
  if (code === 0) return isDay ? 'sun' : 'moon';
  if (code >= 1 && code <= 3) return isDay ? 'cloud-sun' : 'cloud-moon';
  if (code >= 45 && code <= 48) return 'cloud-fog';
  if (code >= 51 && code <= 67) return 'cloud-rain';
  if (code >= 71 && code <= 77) return 'snowflake';
  if (code >= 80 && code <= 82) return 'cloud-drizzle';
  if (code >= 95 && code <= 99) return 'cloud-lightning';
  return 'cloud';
};

// New function to get location from IP with multiple fallbacks
export const getIpLocation = async (): Promise<GeoLocation | null> => {
  try {
    // Primary: get.geojs.io (Usually very reliable and permissive)
    const response = await fetch('https://get.geojs.io/v1/ip/geo.json');
    if (response.ok) {
      const data = await response.json();
      return {
        id: 0,
        name: data.city || "Unknown Location",
        latitude: parseFloat(data.latitude),
        longitude: parseFloat(data.longitude),
        country: data.country,
        admin1: data.region
      };
    }
  } catch (error) {
    // Silent fail to fallback
    console.log("Primary Geo failed, trying backup");
  }

  try {
    const response = await fetch('https://ipapi.co/json/');
    if (response.ok) {
      const data = await response.json();
      return {
        id: 0,
        name: data.city,
        latitude: data.latitude,
        longitude: data.longitude,
        country: data.country_name,
        admin1: data.region
      };
    }
  } catch (e2) {
    console.warn("All IP Geolocation failed. Using default.");
  }
  
  return null;
};

// Fetch current weather for multiple points (Optimized for Bulk Request)
export const getBatchWeather = async (coords: { lat: number; lon: number }[]) => {
  if (!coords || coords.length === 0) return [];

  try {
    // Limit chunk size to avoid URL length issues
    const chunkSize = 50;
    const results = [];

    for (let i = 0; i < coords.length; i += chunkSize) {
      const chunk = coords.slice(i, i + chunkSize);
      const lats = chunk.map(c => c.lat).join(',');
      const lons = chunk.map(c => c.lon).join(',');

      // Correct API call for batch processing in v1
      const url = `${WEATHER_API_URL}?latitude=${lats}&longitude=${lons}&current=temperature_2m,weather_code,wind_speed_10m`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (Array.isArray(data)) {
        // Map the strict API response to our simpler internal structure
        const chunkResults = data.map(d => ({
          temperature: d.current?.temperature_2m ?? 0,
          weathercode: d.current?.weather_code ?? 0,
          windspeed: d.current?.wind_speed_10m ?? 0
        }));
        results.push(...chunkResults);
      } else if (data.current) {
        // Single result fallback
        results.push({
          temperature: data.current.temperature_2m,
          weathercode: data.current.weather_code,
          windspeed: data.current.wind_speed_10m
        });
      }
    }
    return results;
  } catch (error) {
    console.error("Batch weather fetch error", error);
    return [];
  }
};