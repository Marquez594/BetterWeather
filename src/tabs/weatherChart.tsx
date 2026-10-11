import { LabelList, Line, LineChart, XAxis, YAxis } from "recharts";
import type {  TodayType } from "../types";
import { useEffect } from "react";

const numberToHours = {
  "00": 0,
  "01": 1,
  "02": 2,
  "03": 3,
  "04": 4,
  "05": 5,
  "06": 6,
  "07": 7,
  "08": 8,
  "09": 9,
  "10": 10,
  "11": 11,
  "12": 12,
  "13": 13,
  "14": 14,
  "15": 15,
  "16": 16,
  "17": 17,
  "18": 18,
  "19": 19,
  "20": 20,
  "21": 21,
  "22": 22,
  "23": 23,
};

export default function WeatherGraph({ data }: { data: TodayType }) {
  const currentHour = data.currentConditions.datetime.slice(0, 2);
  const hours = [
    ...data.days[0].hours,
    ...data.days[1].hours
  ].slice(numberToHours[currentHour as keyof typeof numberToHours], numberToHours[currentHour as keyof typeof numberToHours] + 12)

  const graphDate = hours.map((hour) => ({
    datetime: new Date(`1970-01-01T${hour.datetime}`).toLocaleTimeString([], {
      hour: "numeric",
      hour12: true,
    }),
    temp: hour.temp.toPrecision(2),
  }));
  useEffect(() => console.log(graphDate), [graphDate]);
  return (
    <LineChart
      width={"100%"}
      height={"100%"}
      data={graphDate}
      margin={{ left: 40, right: 40, bottom: 10 }}
    >
      <XAxis dataKey={"datetime"} tick={{fontWeight: "bold"}}></XAxis>
      <YAxis domain={["dataMin - 5", "dataMax + 5"]} hide></YAxis>

      <Line
        type={"monotone"}
        dataKey={"temp"}
        stroke="#0915f6"
        dot={{ r: 4 }}
        strokeWidth={3}
      >
        <LabelList
          dataKey={"temp"}
          position={"top"}
          className="font-bold"
          offset={15}
        ></LabelList>
      </Line>
    </LineChart>
  );
}
