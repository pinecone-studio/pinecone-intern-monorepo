'use client';
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAddPostMutation } from '@/generated';
import { estateSchema, EstateFormData } from '@/utils/property-zod-schema';
import { uploadImages } from '@/utils/cloudinary';
import { createInput } from '@/components/utils/create-input';

import PropertyDetails from '@/components/addEstate/PropertyDetails';
import ImagesSection from '@/components/addEstate/ImagesSection';
import DescriptionSection from '@/components/addEstate/DescriptionSection';
import RestroomsSection from '@/components/addEstate/RestroomsSection';
import TownDetails from '@/components/addEstate/TownDetails';
import WindowsSection from '@/components/addEstate/WindowsSection';
import FloorDetailsSection from '@/components/addEstate/FloorDetailsSection';
import BalconyLiftSection from '@/components/addEstate/BalconyLiftSection';
import { useAuth } from '@/components/providers';
import { Button } from '@/components/ui/button';

const AddEstate = () => {
  const router = useRouter();
  const [addPost] = useAddPostMutation();
  const userId = useAuth().user?._id;

  const form = useForm<EstateFormData>({
    resolver: zodResolver(estateSchema),
    defaultValues: {
      title: '',
      price: 0,
      houseType: undefined,
      size: 0,
      images: undefined,
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
      balcony: '',
      totalFloors: 0,
      lift: '',
      description: '',
    },
    mode: 'onChange',
  });

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) router.push('/login');
  }, [router]);

  const onSubmit = async (data: EstateFormData) => {
    console.log('onSubmit called');

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Нэвтрээгүй байна');
      router.push('/login');
      return;
    }

    try {
      const uploadedImages = await uploadImages(data.images);
      if (!userId) {
        throw new Error('User ID is required');
      }
      const input = createInput(data, userId, uploadedImages);
      await addPost({ variables: { input } });
      console.log('addPost success');
      toast.success('Зар амжилттай нэмэгдлээ!');
      setTimeout(() => {
        router.push('/');
      }, 3000);
    } catch (error) {
      console.error('addPost error', error);
      toast.error(error instanceof Error ? error.message : 'Зар нэмэхэд алдаа гарлаа');
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-8">
        <div className="flex gap-8">
          <div className="w-[728px]">
            <PropertyDetails />
            <ImagesSection />
            <DescriptionSection />
            <RestroomsSection />
            <TownDetails />
            <WindowsSection />
            <FloorDetailsSection />
            <BalconyLiftSection />
          </div>
        </div>
        <Button type="submit" className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Submit
        </Button>
      </form>
    </FormProvider>
  );
};

export default AddEstate;
