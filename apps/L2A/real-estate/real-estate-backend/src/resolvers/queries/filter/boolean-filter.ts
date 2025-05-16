export const buildBooleanFilter = (field: string, value?: boolean) => {
  return value === true ? { [field]: true } : {};
};
