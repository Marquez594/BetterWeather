import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { weatherIcons, type HourlyType } from "../types";
import { useWeather } from "../weatherContext";

const numberToHours = {
  "00": "12AM",
  "01": "1AM",
  "02": "2AM",
  "03": "3AM",
  "04": "4AM",
  "05": "5AM",
  "06": "6AM",
  "07": "7AM",
  "08": "8AM",
  "09": "9AM",
  "10": "10AM",
  "11": "11AM",
  "12": "12PM",
  "13": "1PM",
  "14": "2PM",
  "15": "3PM",
  "16": "4PM",
  "17": "5PM",
  "18": "6PM",
  "19": "7PM",
  "20": "8PM",
  "21": "9PM",
  "22": "10PM",
  "23": "11PM",
};
export default function Hourly({ data }: { data: HourlyType }) {
  const { location } = useWeather();

  const hours = [
    ...data.days[0].hours,
    ...data.days[1].hours.map((hour) => ({
      ...hour,
      date: data.days[1].datetime,
    })),
  ];
  const currentHour = data.currentConditions.datetime.slice(0, 2);
  const currentIndex = hours.findIndex(
    (hour) => hour.datetime.slice(0, 2) === currentHour,
  );
  const next24Hours = hours.slice(currentIndex, currentIndex + 24);
  return (
    <div className=" flex flex-col flex-1 gap-4">
      <div className="text-white ml-1">
        <h1 className="text-lg font-bold">{location} weather</h1>
        <p className="text-sm">
          {data.resolvedAddress}, as of {data?.currentConditions?.datetime}
        </p>
      </div>
      <div className="flex flex-1 gap-8 bg-white rounded-2xl">
        <div className=" flex-1 my-6 flex flex-col ">
          <h1 className="pl-8 font-bold text-2xl">
            {(() => {
              const [year, month, day] = data.days[0].datetime.split("-");
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
          </h1>
          <table>
            <thead>
              <tr className="border-b">
                <th className="py-4">Time</th>
                <th>Conditions</th>
                <th>Temperature</th>
                <th>Precip Amount</th>
              </tr>
            </thead>
            <tbody>
              {next24Hours.map((hour, index) => (
                <>
                  {hour.date && hour.datetime.slice(0, 2) == "00" ? (
                    <tr>
                      <td className="font-bold pl-8 text-2xl  py-4" colSpan={4}>
                        {(() => {
                          const [year, month, day] = hour.date.split("-");

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
                    </tr>
                  ) : null}
                  <tr className="border-b border-gray-300">
                    <td className="text-center py-5 font-bold">
                      {index == 0
                        ? "Now"
                        : numberToHours[hour.datetime.slice(0, 2)]}
                    </td>
                    <td className="text-center">
                      <div className="flex gap-2 items-center justify-center">
                        <FontAwesomeIcon
                          icon={weatherIcons[hour.icon]}
                          className="text-2xl"
                        ></FontAwesomeIcon>
                        <h2
                          className={`${hour.precipprob > 50 ? "text-blue-400" : "text-gray-400"}`}
                        >
                          {hour.precipprob}%
                        </h2>
                        <h1 className="text-sm">{hour.conditions}</h1>
                      </div>
                    </td>
                    <td className="text-center font-bold">
                      {hour.temp.toFixed(0)}°
                    </td>
                    <td className="text-center">{hour.precip}</td>
                  </tr>
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
