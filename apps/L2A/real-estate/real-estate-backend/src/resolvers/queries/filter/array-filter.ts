export const buildArrayFilter = (field: string, values?: number[]) => {
  return values?.length ? { [field]: { $in: values } } : {};
};
