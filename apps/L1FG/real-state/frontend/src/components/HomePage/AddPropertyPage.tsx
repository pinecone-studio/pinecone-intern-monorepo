'use client';
import React, { useState } from 'react';
import { HouseTypeEnum, useAddPropertyMutation } from '@/generated';
import { PropertyFormModal } from '../ui/modal/PropertyFormModal';

const AddPropertyPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    houseType: HouseTypeEnum.House,
    size: '',
    createdAt: '',
    floorMaterial: '',
    balcony: false,
    floorNumber: 0,
    lift: false,
    totalFloors: 0,
    windowType: '',
    windowsCount: 0,
    garage: false,
    address: '',
    city: '',
    district: '',
    restrooms: 0,
    totalRooms: 0,
  });

  const [addProperty, { data, loading, error }] = useAddPropertyMutation();

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async () => {
    await addProperty({
      variables: {
        input: {
          houseType: formData.houseType,
          size: formData.size,
          createdAt: parseInt(formData.createdAt, 10),
          details: {
            floorMaterial: formData.floorMaterial,
            completionDate: null,
            balcony: formData.balcony,
            floorNumber: formData.floorNumber,
            lift: formData.lift,
            totalFloors: formData.totalFloors,
            windowType: formData.windowType,
            windowsCount: formData.windowsCount,
          },
          garage: formData.garage,
          images: [],
          location: {
            address: formData.address,
            city: formData.city,
            district: formData.district,
          },
          restrooms: formData.restrooms,
          totalRooms: formData.totalRooms,
          uploadedAt: null,
        },
      },
    });
    setModalOpen(false);
  };

  return (
    <div className="p-4">
      <button className="px-4 py-2 bg-blue-600 text-white rounded-md" onClick={handleOpenModal}>
        Add Property
      </button>

      {isModalOpen && <PropertyFormModal formData={formData} onInputChange={handleInputChange} onClose={handleCloseModal} onSubmit={handleSubmit} loading={loading} error={error} />}

      {data && <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-md">Property added successfully!</div>}
    </div>
  );
};

export default AddPropertyPage;
