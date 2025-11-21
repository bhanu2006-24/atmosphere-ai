import React, { useEffect, useState } from 'react';
import { 
  Search, MapPin, Wind, Droplets, Sun, Moon, 
  Cloud, CloudRain, CloudFog, CloudLightning, Snowflake,
  Loader2, ArrowUpRight, Globe, Navigation, AlertCircle, Sunrise, Sunset, Thermometer, Zap
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { GeoLocation, WeatherData } from '../types';
import { searchLocation, getWeather, getWeatherIcon, getIpLocation, getBatchWeather } from '../services/weatherService';
import { CITIES, findCity } from '../data/cities';

const WeatherIcon: React.FC<{ code: number, isDay: number, className?: string }> = ({ code, isDay, className }) => {
  const iconName = getWeatherIcon(code, isDay);
  const props = { className };
  
  switch (iconName) {
    case 'sun': return <Sun {...props} className={`${className} text-yellow-400`} />;
    case 'moon': return <Moon {...props} className={`${className} text-slate-300`} />;
    case 'cloud-sun': return <Cloud {...props} className={`${className} text-yellow-200`} />;
    case 'cloud-moon': return <Cloud {...props} className={`${className} text-slate-400`} />;
    case 'cloud-rain': return <CloudRain {...props} className={`${className} text-blue-400`} />;
    case 'cloud-fog': return <CloudFog {...props} className={`${className} text-gray-400`} />;
    case 'cloud-lightning': return <CloudLightning {...props} className={`${className} text-purple-400`} />;
    case 'snowflake': return <Snowflake {...props} className={`${className} text-cyan-200`} />;
    default: return <Cloud {...props} className={`${className} text-gray-300`} />;
  }
};

export const WeatherDashboard: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GeoLocation[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<GeoLocation | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [relatedCitiesWeather, setRelatedCitiesWeather] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Initial load
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Attempt IP geolocation
        const ipLoc = await getIpLocation();
        if (ipLoc) {
          await handleSelectLocation(ipLoc);
        } else {
          // Fallback to NY
          await handleSelectLocation({
            id: 1,
            name: 'New York',
            latitude: 40.7143,
            longitude: -74.006,
            country: 'USA'
          });
        }
      } catch (e) {
        console.error("Initialization failed", e);
        setError("Could not load initial weather data.");
      } finally {
        setLoading(false);
      }
    };
    
    const fetchRelated = async () => {
      try {
        // Pick random 4 from the massive list
        const randomCities = [...CITIES].sort(() => 0.5 - Math.random()).slice(0, 4);
        const weatherData = await getBatchWeather(randomCities.map(c => ({ lat: c.lat, lon: c.lon })));
        
        // Safe merge
        const merged = randomCities.map((c, i) => {
          const w = weatherData[i];
          return w ? { ...c, ...w } : c; // Only merge if data exists
        });
        
        setRelatedCitiesWeather(merged);
      } catch (e) {
        console.error("Failed to fetch related cities", e);
      }
    };

    init();
    fetchRelated();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length > 1) {
      const localMatches = findCity(val).slice(0, 3).map((c, idx) => ({
        id: 10000 + idx,
        name: c.name,
        latitude: c.lat,
        longitude: c.lon,
        country: c.country,
        admin1: 'Popular City'
      }));
      
      if (localMatches.length > 0) {
        setResults(localMatches);
      } else {
        try {
          const res = await searchLocation(val);
          setResults(res);
        } catch {
          setResults([]);
        }
      }
    } else {
      setResults([]);
    }
  };

  const handleSelectLocation = async (loc: GeoLocation) => {
    try {
      setLoading(true);
      setError(null);
      setSelectedLocation(loc);
      setResults([]);
      setQuery('');
      
      const data = await getWeather(loc.latitude, loc.longitude);
      if (data) {
        setWeather(data);
      } else {
        throw new Error("Weather data unavailable");
      }
    } catch (e) {
      console.error("Selection failed", e);
      setError("Unable to retrieve weather for this location.");
    } finally {
      setLoading(false);
    }
  };

  const chartData = weather?.hourly.time.slice(0, 24).map((t, i) => ({
    time: new Date(t).toLocaleTimeString('en-US', { hour: 'numeric' }),
    temp: weather.hourly.temperature_2m[i]
  })) || [];

  // Helper to format times
  const formatTime = (isoString?: string) => {
    if (!isoString) return '--:--';
    return new Date(isoString).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const getTravelOutlook = (code: number) => {
    if (code === 0) return "Perfect for outdoor adventures.";
    if (code <= 3) return "Great conditions for exploring.";
    if (code >= 51) return "Bring an umbrella for the trip.";
    if (code >= 71) return "Winter gear recommended.";
    return "Check local conditions before travel.";
  };

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* Hero / Search */}
      <div className="relative z-10">
        <div className="flex flex-col items-center space-y-4 text-center py-8">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium tracking-wide uppercase mb-2 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
            <Navigation className="w-3 h-3 mr-1" /> Live Satellite Connection
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
            Atmosphere <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Prime</span>
          </h1>
          <p className="text-slate-400 max-w-lg text-lg">
            Global weather intelligence for the modern traveler.
          </p>
          
          <div className="relative w-full max-w-md mt-8 group">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 blur-xl rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            <div className="relative flex items-center bg-slate-900/80 border border-white/10 rounded-full px-4 backdrop-blur-xl shadow-2xl">
              <Search className="w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={handleSearch}
                placeholder="Search 1,000+ global cities..."
                className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-slate-500 py-4 px-3 text-base"
              />
            </div>
            
            {results.length > 0 && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden z-50 shadow-2xl">
                {results.map(loc => (
                  <button
                    key={loc.id}
                    onClick={() => handleSelectLocation(loc)}
                    className="w-full text-left px-5 py-3 text-slate-300 hover:bg-blue-600/20 hover:text-white transition-colors flex items-center justify-between border-b border-white/5 last:border-0"
                  >
                    <span className="font-medium">{loc.name}</span>
                    <span className="text-xs text-slate-500 uppercase tracking-wider">{loc.country}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="flex justify-center">
           <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              {error}
           </div>
        </div>
      )}

      {loading && (
        <div className="flex justify-center py-20">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full"></div>
            <Loader2 className="relative w-12 h-12 text-blue-500 animate-spin" />
          </div>
        </div>
      )}

      {!loading && weather && selectedLocation && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Weather Card */}
          <div className="lg:col-span-2 glass-panel rounded-[2rem] p-8 relative overflow-hidden group border-t border-white/10">
            <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors duration-1000"></div>
            
            <div className="flex justify-between items-start relative z-10">
              <div>
                <div className="flex items-center gap-2 text-blue-400 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="tracking-wider uppercase text-sm font-bold">{selectedLocation.name}</span>
                  <span className="text-slate-500 text-xs font-normal px-2 py-0.5 bg-white/5 rounded-full">{selectedLocation.country}</span>
                </div>
                <div className="flex items-baseline text-white tracking-tighter">
                  <span className="text-8xl font-bold">{Math.round(weather.current_weather.temperature)}</span>
                  <span className="text-4xl font-light text-slate-400 align-top mt-4">°</span>
                </div>
                <div className="text-slate-400 font-medium text-lg mt-2 flex items-center gap-3">
                   <span className="flex items-center gap-1"><Thermometer className="w-4 h-4" /> RealFeel {Math.round(weather.current_weather.apparent_temperature)}°</span>
                   <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                   <span>{getTravelOutlook(weather.current_weather.weathercode)}</span>
                </div>
              </div>
              <div className="p-6 bg-gradient-to-br from-white/5 to-white/0 rounded-3xl border border-white/10 backdrop-blur-md shadow-lg transform group-hover:scale-105 transition-transform duration-500">
                <WeatherIcon 
                  code={weather.current_weather.weathercode} 
                  isDay={weather.current_weather.is_day} 
                  className="w-24 h-24 filter drop-shadow-lg"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              {[
                { label: 'Wind Speed', val: `${weather.current_weather.windspeed} km/h`, icon: Wind, color: 'text-blue-400' },
                { label: 'Humidity', val: `${weather.current_weather.humidity}%`, icon: Droplets, color: 'text-cyan-400' },
                { label: 'UV Index', val: weather.current_weather.is_day ? 'High' : 'Low', icon: Sun, color: 'text-yellow-400' },
                { label: 'Visibility', val: '10 km', icon: Zap, color: 'text-purple-400' }
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-950/30 border border-white/5 hover:border-white/10 transition-colors">
                  <div className="flex items-center gap-2 text-slate-400 mb-2 text-xs font-medium uppercase tracking-wider">
                    <item.icon className={`w-3 h-3 ${item.color}`} /> {item.label}
                  </div>
                  <span className="text-xl font-semibold text-white">{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Astro / Daylight Card */}
          <div className="glass-panel rounded-[2rem] p-1 flex flex-col h-full relative overflow-hidden border-t border-white/10">
             <div className="bg-slate-900/40 rounded-[1.8rem] h-full p-6 flex flex-col">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl shadow-lg shadow-orange-500/20">
                  <Sun className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg leading-none">Daylight</h3>
                  <p className="text-xs text-orange-300">Astronomical Data</p>
                </div>
              </div>

              <div className="flex-grow flex flex-col justify-center space-y-6">
                {weather.daily.sunrise && weather.daily.sunset ? (
                  <>
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3">
                         <Sunrise className="w-6 h-6 text-orange-400" />
                         <div>
                           <p className="text-xs text-slate-400">Sunrise</p>
                           <p className="text-lg font-semibold text-white">{formatTime(weather.daily.sunrise[0])}</p>
                         </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                      <div className="flex items-center gap-3">
                         <Sunset className="w-6 h-6 text-indigo-400" />
                         <div>
                           <p className="text-xs text-slate-400">Sunset</p>
                           <p className="text-lg font-semibold text-white">{formatTime(weather.daily.sunset[0])}</p>
                         </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-slate-500 mb-1">
                        <span>Daylight Progress</span>
                        <span>{weather.current_weather.is_day ? 'Day' : 'Night'}</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                        <div 
                          className={`h-full ${weather.current_weather.is_day ? 'bg-orange-500' : 'bg-indigo-500'}`} 
                          style={{ width: '60%' }} // Static for demo, in real app calculate using Date.now()
                        ></div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-slate-500">Astro data unavailable</div>
                )}
              </div>
             </div>
          </div>

          {/* Hourly Chart */}
          <div className="lg:col-span-3 glass-panel rounded-[2rem] p-8 border-t border-white/10">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ArrowUpRight className="w-5 h-5 text-blue-500" /> Temperature Trend
              </h3>
              <div className="text-xs text-slate-500 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                Next 24 Hours
              </div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis 
                    dataKey="time" 
                    stroke="#475569" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickMargin={10}
                  />
                  <YAxis 
                    stroke="#475569" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(val) => `${val}°`} 
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '12px', color: '#f8fafc', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                    itemStyle={{ color: '#60a5fa' }}
                    cursor={{ stroke: '#334155', strokeWidth: 1, strokeDasharray: '5 5' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="temp" 
                    stroke="#3b82f6" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorTemp)" 
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Popular Cities Ticker */}
          <div className="lg:col-span-3">
            <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
              <Globe className="w-4 h-4 text-slate-400" /> Global Outlook
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {relatedCitiesWeather.map((city, idx) => (
                <div key={idx} className="glass-panel p-4 rounded-2xl flex items-center justify-between group hover:bg-white/5 transition-colors cursor-pointer" onClick={() => handleSelectLocation({id: 999+idx, name: city.name, latitude: city.lat, longitude: city.lon, country: city.country})}>
                  <div>
                    <div className="text-sm font-medium text-slate-200 group-hover:text-white">{city.name}</div>
                    <div className="text-xs text-slate-500">{city.country}</div>
                  </div>
                  <div className="flex items-center gap-3">
                     <div className="text-right">
                        <div className="font-bold text-white">{city.temperature !== undefined ? Math.round(city.temperature) : '--'}°</div>
                     </div>
                     {city.weathercode !== undefined && (
                        <WeatherIcon code={city.weathercode} isDay={1} className="w-6 h-6 text-slate-400" />
                     )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};