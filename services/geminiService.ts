import { GoogleGenAI } from "@google/genai";
import { WeatherData } from '../types';

// Note: In a real production app, this key should be proxied via backend or injected via env vars
// For this demo, it relies on process.env.API_KEY as per instructions
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getAIWeatherInsight = async (weather: WeatherData, locationName: string): Promise<string> => {
  try {
    const prompt = `
      Analyze the current weather for ${locationName}:
      - Temperature: ${weather.current_weather.temperature}°C
      - Wind: ${weather.current_weather.windspeed} km/h
      - Humidity: ${weather.current_weather.humidity}%
      - Condition Code: ${weather.current_weather.weathercode}
      
      Provide a witty, "startup-style" brief summary (max 2 sentences). 
      Then, give 3 bullet points for "Smart Recommendations" (clothing, activity, travel).
      Tone: Premium, helpful, slightly tech-focused.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    return response.text || "AI Insight unavailable at the moment.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to generate AI insights. Please check your API configuration.";
  }
};