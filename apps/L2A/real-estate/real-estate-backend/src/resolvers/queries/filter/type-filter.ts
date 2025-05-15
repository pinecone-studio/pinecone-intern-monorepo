export const buildTypeFilter = (type?: string[]) => {
  return type?.length ? { type: { $in: type } } : {};
};
