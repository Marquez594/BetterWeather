import TenDays from "./tabs/10days";
import Hourly from "./tabs/hourly";
import Today from "./tabs/today";
import { useWeather } from "./weatherContext";
import { useQuery } from "@tanstack/react-query";

export default function DisplayWeather() {
  const { tab, location } = useWeather();
  const todayWeather = useQuery({
    queryKey: ["Today", location],
    queryFn: async () => {
      const res = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=XXCWKA49KF58RH4WXCNWPLULP`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      console.log(data);
      return data;
    },
  });
  return (
    <div className="bg-[#1c4fdb] min-h-screen pt-24 px-6 pb-10 flex flex-col">
      {todayWeather.data ? (
        <>
          {tab == "Today" && <Today data={todayWeather.data}></Today>}
          {tab == "Hourly" && <Hourly data={todayWeather.data}></Hourly>}
          {tab == "10days" && <TenDays data={todayWeather.data}></TenDays>}
        </>
      ) : null}
    </div>
  );
}
