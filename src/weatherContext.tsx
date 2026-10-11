import { createContext, useContext, useState } from "react";

const WeatherContext = createContext(null);

function WeatherProvider({ children }) {
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
  return useContext(WeatherContext);
}

export { useWeather, WeatherProvider };
