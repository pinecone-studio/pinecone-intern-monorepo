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
  subDistrict: string;
  district: string;
  city: string;
  address: string;
  completionDate: string;
  windowsCount: number;
  windowType: string;
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
