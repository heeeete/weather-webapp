export const weatherKeys = {
  detail: (lat?: number, lon?: number) => ['weather', lat, lon] as const,
};
