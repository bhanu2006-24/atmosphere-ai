import React, { useEffect, useRef, useState } from 'react';
import * as L from 'leaflet';
import { CITIES } from '../data/cities';
import { getBatchWeather } from '../services/weatherService';
import { Loader2 } from 'lucide-react';

export const LiveMap: React.FC = () => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Select top global cities for the map
  const mapCities = CITIES.slice(0, 50); 

  useEffect(() => {
    let mounted = true;

    const initMap = async () => {
      if (!mapContainerRef.current) return;

      // Initialize map if not already done
      if (!mapInstanceRef.current) {
        mapInstanceRef.current = L.map(mapContainerRef.current, {
          zoomControl: false,
          attributionControl: false
        }).setView([20, 0], 2);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
          attribution: '&copy;OpenStreetMap, &copy;CartoDB',
          subdomains: 'abcd',
          maxZoom: 19
        }).addTo(mapInstanceRef.current);
      }

      try {
        setLoading(true);
        const coords = mapCities.map(c => ({ lat: c.lat, lon: c.lon }));
        const weatherData = await getBatchWeather(coords);
        
        if (!mounted) return;

        // Clear existing markers if any (though we only init once)
        mapInstanceRef.current.eachLayer((layer) => {
          if (layer instanceof L.Marker) {
            mapInstanceRef.current?.removeLayer(layer);
          }
        });

        weatherData.forEach((weather, idx) => {
          if (!weather) return;
          
          const city = mapCities[idx];
          const color = getTempColor(weather.temperature);

          // Create custom HTML icon
          const iconHtml = `
            <div class="custom-marker-pin" style="
              background-color: ${color}20; 
              border: 2px solid ${color}; 
              border-radius: 50%; 
              width: 34px; 
              height: 34px; 
              display: flex; 
              align-items: center; 
              justify-content: center;
              color: white;
              font-weight: 700;
              font-size: 11px;
              box-shadow: 0 0 15px ${color}60;
              font-family: 'Plus Jakarta Sans', sans-serif;
              backdrop-filter: blur(4px);
            ">
              ${Math.round(weather.temperature)}°
            </div>
          `;

          const customIcon = L.divIcon({
            className: 'custom-div-icon',
            html: iconHtml,
            iconSize: [34, 34],
            iconAnchor: [17, 17],
            popupAnchor: [0, -20]
          });

          const marker = L.marker([city.lat, city.lon], { icon: customIcon })
            .addTo(mapInstanceRef.current!);

          const popupContent = `
            <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 4px;">
              <div style="font-weight: 700; font-size: 14px; margin-bottom: 4px; color: #60a5fa;">${city.name}</div>
              <div style="font-size: 12px; color: #cbd5e1;">
                ${Math.round(weather.temperature)}°C · ${weather.windspeed} km/h Wind
              </div>
            </div>
          `;
          
          marker.bindPopup(popupContent);
        });

      } catch (error) {
        console.error("Failed to load map data", error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    initMap();

    return () => {
      mounted = false;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []); // Run once on mount

  const getTempColor = (temp: number) => {
    if (temp < 0) return '#60a5fa'; // Blue 400
    if (temp < 15) return '#22d3ee'; // Cyan 400
    if (temp < 25) return '#4ade80'; // Green 400
    if (temp < 30) return '#facc15'; // Yellow 400
    return '#f87171'; // Red 400
  };

  return (
    <div className="h-[calc(100vh-120px)] w-full glass-panel rounded-3xl overflow-hidden relative animate-fade-in border border-white/10 shadow-2xl">
      <div ref={mapContainerRef} className="w-full h-full bg-[#0f172a]" />
      
      {loading && (
        <div className="absolute inset-0 z-[1000] bg-[#0f172a]/80 flex flex-col items-center justify-center backdrop-blur-sm transition-opacity duration-500">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
          <p className="text-blue-200 font-medium tracking-wide animate-pulse">Synchronizing Global Satellites...</p>
        </div>
      )}

      <div className="absolute bottom-8 left-8 z-[400] glass-panel px-6 py-4 rounded-2xl border border-white/10 shadow-xl pointer-events-none">
        <div className="flex items-center gap-2 mb-1">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
           <h3 className="text-sm font-bold text-white tracking-wide">LIVE GLOBAL VIEW</h3>
        </div>
        <p className="text-xs text-slate-400">Real-time telemetry from {mapCities.length} major hubs</p>
      </div>
    </div>
  );
};