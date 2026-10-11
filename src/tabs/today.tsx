import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useWeather } from "../weatherContext";
import { weatherIcons, type TodayType } from "../types";
import WeatherGraph from "./weatherChart";

export default function Today({data}:{
  data: TodayType
}
) {
  const {location} = useWeather()

  return (
    <div className=" flex flex-col flex-1 gap-4">
      <div className="text-white ml-1">
        <h1 className="text-lg font-bold">{location} weather</h1>
        <p className="text-sm">{data.resolvedAddress}, as of {data?.currentConditions?.datetime}</p>
      </div>
      <div className="flex flex-1 gap-8">
        <div className="flex-1 bg-[#08103e] rounded-4xl p-4 px-6 text-white min-w-0 flex flex-col justify-between">
          <div className="flex items-center justify-between h-fit ">
            <h1 className="text-9xl">{data?.currentConditions?.temp.toFixed(0)}°</h1>
            <div className="flex flex-col items-center gap-2  h-full justify-center">
              <FontAwesomeIcon
                icon={weatherIcons[data.currentConditions.icon]}
                className="text-7xl"
              ></FontAwesomeIcon>
              <h1 >{data.currentConditions.conditions}</h1>
            </div>
          </div>
          <div className="flex flex-col pb-6 gap-2 text-xl">
            <p>Feels like: {data?.currentConditions?.feelslike.toFixed(0)}° | High: {data.days[0].tempmax.toFixed(0)}° | Low: {data.days[0].tempmin.toFixed(0)}°</p>
            <p>Chance of rain: {data.currentConditions.precipprob.toFixed(0)}% | {data.currentConditions.precip.toFixed(0)}in</p>
          </div>
        </div>
        <div className="flex-2 min-w-0 bg-white rounded-2xl ">
          <div className="w-full h-full min-h-[300px]">
            <WeatherGraph data={data}></WeatherGraph>
          </div>
        </div>
      </div>
    </div>
  );
}
