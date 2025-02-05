import { useState } from 'react';

export const useFormState = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    houseType: null,
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
