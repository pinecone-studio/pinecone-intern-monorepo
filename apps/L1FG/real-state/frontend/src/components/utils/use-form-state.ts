import { HouseTypeEnum, PostStats } from '@/generated';
import { useState } from 'react';

type FormState = {
  title: string;
  description: string;
  price: string;
  houseType: HouseTypeEnum | '';
  size: string;
  images: string[];
  totalRooms: number;
  garage: boolean;
  restrooms: number;
  subDistrict: string | null | undefined;
  district: string | null | undefined;
  city: string | null | undefined;
  address: string | null | undefined;
  completionDate: string | null | undefined;
  windowsCount: number | null | undefined;
  windowType: string | null | undefined;
  floorMaterial: string | null | undefined;
  floorNumber: number | null | undefined;
  balcony: boolean | null | undefined;
  totalFloors: number | null | undefined;
  lift: boolean | null | undefined;
  status?: PostStats;
};

export const useFormState = () => {
  const [formData, setFormData] = useState<FormState>({
    title: '',
    description: '',
    price: '',
    houseType: '',
    size: '',
    images: [],
    totalRooms: 0,
    garage: false,
    restrooms: 0,
    subDistrict: '',
    district: '',
    city: '',
    address: '',
    completionDate: '',
    windowsCount: 0,
    windowType: '',
    floorMaterial: '',
    floorNumber: 0,
    balcony: false,
    totalFloors: 0,
    lift: false,
    status: PostStats.Pending,
  });

  return { formData, setFormData };
};
