export type Property = {
  name: string;
  title: string;
  id: string;
  price: string;
  size: string;
  bedrooms: number;
  bathrooms: number;
  parking: string;
  phone: string;
  description: string;
  images: string[];
  district: string;
  subDistrict: string;
  address: string;
};
export type PropertyInfoProps = {
  completionDate: string;
  windowsCount: number;
  windowType: string;
  floorNumber: number;
  totalFloors: number;
  floorMaterial: string;
  balcony: boolean;
  lift: boolean;
};
