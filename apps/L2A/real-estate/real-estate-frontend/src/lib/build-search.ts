export const buildSearch = (searchValue: string) => {
  if (!searchValue?.trim()) return {};
  return {
    debouncedSearch: searchValue,
  };
};
