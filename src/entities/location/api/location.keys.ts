export const locationKeys = {
  reverseGeocode: (lat?: number, lon?: number) =>
    ['location', 'reverse-geocode', lat, lon] as const,
};
