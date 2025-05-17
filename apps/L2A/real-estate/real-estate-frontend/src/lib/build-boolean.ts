export const buildBooleans = (params: Record<string, any>) => {
  const result: Record<string, boolean> = {};

  if (params.garage === 'true') result.garage = true;
  if (params.lift === 'true') result.lift = true;
  if (params.balcony === 'true') result.balcony = true;

  return result;
};

