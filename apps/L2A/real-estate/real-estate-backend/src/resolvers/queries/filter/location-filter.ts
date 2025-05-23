export const buildLocationFilter = (location?: { city?: string; district?: string }) => {
  const filter: Record<string, string> = {};
  if (location?.city) filter['location.city'] = location.city;
  if (location?.district) filter['location.district'] = location.district;
  return filter;
};
