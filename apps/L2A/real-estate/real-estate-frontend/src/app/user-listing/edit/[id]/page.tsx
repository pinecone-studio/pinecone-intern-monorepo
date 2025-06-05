/* eslint-disable complexity */
'use client';

import { Formik, Form } from 'formik';
import PreviewSection from '../_components/PreviewSection';
import BuildingInfoSection from '../_components/BuildingInfoSection';
import GeneralInfoSection from '../_components/GeneralInfoSection';
import ImagesSection from '../_components/ImagesSection';
import LocationSection from '../_components/LocationSection';
import { useGetPostByIdQuery, useUpdatePostByIdMutation } from '@/generated';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { useRef } from 'react';

const Page = () => {
  const params = useParams() as { id: string };
  const id = params?.id;
  const { data, loading } = useGetPostByIdQuery({ variables: { _id: id } });
  const [updatePost] = useUpdatePostByIdMutation();
  const hasSubmittedRef = useRef(false); 
  const draftKey = `unsaved-post-draft-${id}`;

  if (loading || !data?.getPostById) {
    return (
  <div className="flex items-center justify-center h-screen bg-[#F9F9F9]">
    <div className="space-y-4 text-center">
      <div className="w-12 h-12 mx-auto border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
      <p className="text-lg font-medium text-gray-600">Уншиж байна...</p>
    </div>
  </div>
);
  }

  const post = data.getPostById;
 /* istanbul ignore next */
  const savedDraft =
    typeof window !== 'undefined' ? localStorage.getItem(draftKey) : null;

  const parsedDraft = savedDraft ? JSON.parse(savedDraft) : null;
/* istanbul ignore next */
  const initialValues = parsedDraft || {
    _id: post._id,
    propertyOwnerId: post.propertyOwnerId || '',
    title: post.title || '',
    description: post.description || '',
    price: post.price?.toString() || '',
    type: post.type || 'HOUSE',
    size: post.size?.toString() || '',
    totalRooms: post.totalRooms?.toString() || '',
    restrooms: post.restrooms?.toString() || '',
    garage: post.garage || false,
    lift: post.lift || false,
    feature: post.feature || [],
    images: post.images || [],
    selectedImageIndex: null,
    location: {
      city: post.location?.city || '',
      district: post.location?.district || '',
      address: post.location?.address || '',
    },
    roofMaterial: post.roofMaterial || '',
    floorNumber: post.floorNumber?.toString() || '',
    totalFloors: post.totalFloors?.toString() || '',
    balcony: post.balcony || false,
    windowsCount: post.windowsCount?.toString() || '',
    windowType: post.windowType || '',
    completionDate: post.completionDate || '',
    door: post.door || '',
    flooring: '',
  };
 /* istanbul ignore next */
  const handleSubmit = async (values: any) => {
    if (hasSubmittedRef.current) return;
    hasSubmittedRef.current = true;

    try {
      await updatePost({
        variables: {
          id: values._id,
          input: {
            propertyOwnerId: values.propertyOwnerId,
            title: values.title,
            description: values.description,
            price: parseFloat(values.price),
            type: values.type,
            size: parseFloat(values.size),
            totalRooms: parseInt(values.totalRooms),
            restrooms: parseInt(values.restrooms),
            garage: values.garage,
            lift: values.lift,
            feature: values.feature,
            images: values.images,
            location: {
              city: values.location.city,
              district: values.location.district,
              address: values.location.address,
            },
            roofMaterial: values.roofMaterial,
            floorNumber: parseInt(values.floorNumber),
            totalFloors: parseInt(values.totalFloors),
            balcony: values.balcony,
            windowsCount: parseInt(values.windowsCount),
            windowType: values.windowType,
            completionDate: values.completionDate,
            door: values.door,
          },
        },
      });

      localStorage.removeItem(draftKey);

      toast.success('Амжилттай хадгалагдлаа', {
        description: 'Таны засвар амжилттай илгээгдлээ.',
        duration: 3000,
        className: 'text-sm',
      });
    } catch (err) {
      console.error(err);

      toast.error('Алдаа гарлаа', {
        description: 'Засвар илгээхэд алдаа гарлаа.',
        duration: 3000,
        className: 'text-sm',
      });
    } finally {
      hasSubmittedRef.current = false; 
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit} enableReinitialize>
      <Form className="bg-[#F9F9F9] py-10 px-5 sm:px-8 md:px-10" data-cy="edit-page">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-10">
          <div className="w-full max-w-[728px] space-y-6">
            <GeneralInfoSection />
            <ImagesSection />
            <LocationSection />
            <BuildingInfoSection />
          </div>
          <PreviewSection draftKey={draftKey}/>
        </div>
      </Form>
    </Formik>
  );
};

export default Page;
