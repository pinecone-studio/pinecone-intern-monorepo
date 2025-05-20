export const buildSearchFilter = (debouncedSearch: string) => {
  if (!debouncedSearch?.trim()) return {};

  const regex = { $regex: debouncedSearch, $options: 'i' };

  return {
    $or: [
      { 'location.city': regex },
      { 'location.district': regex }
    ]
  };
};
