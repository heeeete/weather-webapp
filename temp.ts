/** Unix time (seconds) */
export type UnixSeconds = number;

export interface WeatherApiResponse {
  lat: number;
  lon: number;
  timezone: string; // e.g. "Asia/Seoul"
  timezone_offset: number; // seconds (e.g. 32400)
  current: CurrentWeather;
  hourly: HourlyWeather[];
}

export interface CurrentWeather {
  dt: UnixSeconds;
  sunrise: UnixSeconds;
  sunset: UnixSeconds;

  temp: number;
  feels_like: number;

  pressure: number; // hPa
  humidity: number; // %
  dew_point: number; // °C (or K depending on API config; 여기선 값 형태상 °C로 보임 - 확실하지 않음)
  uvi: number;

  clouds: number; // %
  visibility: number; // meters

  wind_speed: number; // m/s
  wind_deg: number; // degrees

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

  wind_gust?: number; // 일부 시간대에만 존재

  weather: WeatherCondition[];

  pop: number; // probability of precipitation (0..1)

  rain?: Precipitation1h; // 비가 있을 때만 존재
  snow?: Precipitation1h; // 눈이 있을 때만 존재
}

export interface WeatherCondition {
  id: number;
  main: string; // e.g. "Clear", "Clouds", "Rain", "Snow"
  description: string; // e.g. "clear sky"
  icon: string; // e.g. "01n"
}

export interface Precipitation1h {
  /** precipitation volume for last 1 hour (mm) */
  '1h': number;
}
