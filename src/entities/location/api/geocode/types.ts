export interface GeocodeResponse {
  addresses?: Array<{
    x?: string; // lon
    y?: string; // lat
  }>;
}

export interface LatLon {
  lat: number;
  lon: number;
}
