import { createContext, useContext, useState, type ReactNode } from "react";
import type { WeatherContextType } from "./types";

const WeatherContext = createContext<WeatherContextType | null>(null);

function WeatherProvider({ children } : {children: ReactNode}) {
  const [location, setLocation] = useState<string>("Wayne,NJ");
  const [tab, setTab] = useState<"Today" | "Hourly" | "10days">("Today");

  return (
    <WeatherContext.Provider
      value={{
        location,
        setLocation,
        tab,
        setTab,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
}

function useWeather() {
  const context = useContext(WeatherContext);
  if (context == null) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
}

export { useWeather, WeatherProvider };
