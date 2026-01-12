export interface ReverseGeocodeResponse {
  results?: Array<{
    region?: {
      area1?: { name?: string };
      area2?: { name?: string };
      area3?: { name?: string };
      area4?: { name?: string };
    };
  }>;
}

export interface LocationRegionParts {
  area1: string;
  area2: string;
  area3: string;
  area4: string;
}
