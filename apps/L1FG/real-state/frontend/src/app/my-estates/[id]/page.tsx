'use client';

import { useGetPostByIdQuery } from '@/generated';
import { useFormState } from '@/components/utils/use-form-state';
import PropertyDetails from '@/components/addEstate/PropertyDetails';
import DescriptionSection from '@/components/addEstate/DescriptionSection';
import TownDetails from '@/components/addEstate/TownDetails';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';

const EditEstate = () => {
  const { id } = useParams();
  const { formData, setFormData } = useFormState();
  const { data, loading } = useGetPostByIdQuery({
    variables: { id: id as string },
  });

  useEffect(() => {
    if (data?.getPostById) {
      setFormData({
        ...formData,
        title: data.getPostById.title,
        description: data.getPostById.description,
        price: data.getPostById.price,
        houseType: data.getPostById.propertyDetail.houseType,
        size: data.getPostById.propertyDetail.size,
        totalRooms: data.getPostById.propertyDetail.totalRooms,
        city: data.getPostById.propertyDetail.location.city,
        district: data.getPostById.propertyDetail.location.district,
        subDistrict: data.getPostById.propertyDetail.location.subDistrict,
        address: data.getPostById.propertyDetail.location.address,
      });
    }
  }, [data]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) return <div>Loading...</div>;

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Үл хөдлөх засах</h1>
        <PropertyDetails formData={formData} handleChange={handleChange} />
        <DescriptionSection formData={formData} handleChange={handleChange} />
        <TownDetails formData={formData} handleChange={handleChange} />
      </div>
    </main>
  );
};

export default EditEstate;
