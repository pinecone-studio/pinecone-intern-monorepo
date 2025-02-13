import { HouseTypeEnum } from '@/generated';
import { useState } from 'react';

type FormState = {
  title: string;
  description: string;
  price: string;
  houseType: HouseTypeEnum | '';
  size: string;
  images: string[];
  totalRooms: number;
  garage: string;
  restrooms: number;
  subDistrict: string | null | undefined;
  district: string | null | undefined;
  city: string | null | undefined;
  address: string | null | undefined;
  completionDate: string | null | undefined;
  windowsCount: number | null | undefined;
  windowType: string | null | undefined;
  floorMaterial: string;
  floorNumber: number;
  balcony: string;
  totalFloors: number;
  lift: string;
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
    garage: '',
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
    balcony: '',
    totalFloors: 0,
    lift: '',
  });

  return { formData, setFormData };
};
