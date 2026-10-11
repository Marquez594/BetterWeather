import {
  faCloud,
  faCloudBolt,
  faCloudMoon,
  faCloudRain,
  faCloudSun,
  faMoon,
  faSmog,
  faSnowflake,
  faSun,
  faWind,
} from "@fortawesome/free-solid-svg-icons";

export type TodayType = {
  currentConditions: {
    datetime: string;
    feelslike: number;
    temp: number;
    precipprob: number;
    precip: number;
    icon: string;
    conditions: string;
  };

  days: {
    tempmax: number;
    tempmin: number;

    hours: {
      datetime: string;
      temp: number;
      icon: string;
    }[];
  }[];

  resolvedAddress: string;
};

export type HourlyType = {
  currentConditions: {
    datetime: string;
  };
  resolvedAddress: string;
  days: {
    datetime: string;
    hours: {
      datetime: string;
      icon: string;
      conditions: string;
      temp: number;
      precipprob: number;
      precip: number;
      date: string | null;
    }[];
  }[];
};

export type dayType = {
  currentConditions: {
    datetime: string;
  };
  resolvedAddress: string;
  days: {
    datetime: string;
    conditions: string;
    tempmin: number;
    tempmax: number;
    precipprob: number;
    icon: string;
  }[];
};

export type TodayGraphType = {
  currentConditions: {
    datetime: string;
  };
  days: {
    hours: {
      datetime: string;
      temp: number;
      icon: string;
    }[];
  }[];
};

export const weatherIcons = {
  "clear-day": faSun,
  "clear-night": faMoon,
  "partly-cloudy-day": faCloudSun,
  "partly-cloudy-night": faCloudMoon,
  cloudy: faCloud,
  rain: faCloudRain,
  showers: faCloudRain,
  "thunder-rain": faCloudBolt,
  snow: faSnowflake,
  fog: faSmog,
  wind: faWind,
};
