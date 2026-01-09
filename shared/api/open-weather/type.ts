/** Unix time (seconds) */
export type UnixSeconds = number;

export interface WeatherApiResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeather;
  hourly: HourlyWeather[];
  daily: DailyWeather[];
}

export interface CurrentWeather {
  dt: UnixSeconds;
  sunrise: UnixSeconds;
  sunset: UnixSeconds;

  temp: number;
  feels_like: number;

  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;

  clouds: number;
  visibility: number;

  wind_speed: number;
  wind_deg: number;

  weather: WeatherCondition[];
}

export interface HourlyWeather {
  dt: UnixSeconds;

  temp: number;
  feels_like: number;

  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;

  clouds: number;
  visibility: number;

  wind_speed: number;
  wind_deg: number;

  weather: WeatherCondition[];
}

export interface DailyWeather {
  dt: UnixSeconds;
  sunrise: UnixSeconds;
  sunset: UnixSeconds;

  temp: DailyTemp;
  feels_like: DailyFeelsLike;

  pressure: number;
  humidity: number;
  dew_point: number;

  wind_speed: number;
  wind_deg: number;

  weather: WeatherCondition[];

  clouds: number;
  pop: number;

  uvi: number;
}

export interface DailyTemp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface DailyFeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface WeatherCondition {
  id: number;
  main: string; // e.g. "Clear", "Clouds", "Rain", "Snow"
  description: string; // e.g. "clear sky"
  icon: string; // e.g. "01n"
}
