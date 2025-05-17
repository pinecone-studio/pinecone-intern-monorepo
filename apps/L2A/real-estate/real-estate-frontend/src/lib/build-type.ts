import { PropertyType } from "@/generated";

export const buildType = (type?: string) => {
  return type ? { type: type.split(',') as PropertyType[] } : {};
};
