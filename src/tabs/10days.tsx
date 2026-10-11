import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { weatherIcons, type dayType } from "../types";
import { useWeather } from "../weatherContext";

export default function TenDays({ data }: { data: dayType }) {
  const { location } = useWeather();
  return (
    <div className="flex flex-col flex-1 gap-4">
      <div className="text-white ml-1">
        <h1 className="text-lg font-bold">{location} weather</h1>
        <p className="text-sm">
          {data.resolvedAddress}, as of {data?.currentConditions?.datetime}
        </p>
      </div>

      <div className="flex flex-1 gap-8 bg-white rounded-2xl">
        <div className="flex-1 w-full flex flex-col py-6">
          <table>
            <thead>
              <tr className="border-b">
                <th className="py-4">Day</th>
                <th>Conditions</th>
                <th>Low</th>
                <th>High</th>
                <th>Perception Chance</th>
              </tr>
            </thead>
            <tbody>
              {data.days.map((date, index) => (
                <tr>
                  <td className="text-center py-5 font-bold">
                    {index == 0
                      ? "Today"
                      : (() => {
                          const [year, month, day] = date.datetime.split("-");
                          return new Date(
                            Number(year),
                            Number(month) - 1,
                            Number(day),
                          ).toLocaleDateString("en-US", {
                            weekday: "long",
                            day: "numeric",
                            month: "short",
                          });
                        })()}
                  </td>
                  <td className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <FontAwesomeIcon
                        icon={weatherIcons[date.icon as keyof typeof weatherIcons]}
                      ></FontAwesomeIcon>
                      <h2>{date.conditions}</h2>
                    </div>
                  </td>
                  <td className="text-center font-bold">
                    {date.tempmin.toPrecision(2)}°
                  </td>
                  <td className="text-center font-bold">
                    {date.tempmax.toPrecision(2)}°
                  </td>
                  <td
                    className={`text-center ${date.precipprob > 50 ? "text-blue-400" : "text-gray-400"}`}
                  >
                    {date.precipprob}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
