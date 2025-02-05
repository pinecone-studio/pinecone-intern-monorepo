'use client';

import React from 'react';
import { useAddPostMutation } from '@/generated';
import TownDetails from '@/components/addEstate/TownDetails';
import PropertyDetails from '@/components/addEstate/PropertyDetails';
import ImagesSection from '@/components/addEstate/ImagesSection';
import RestroomsSection from '@/components/addEstate/RestroomsSection';
import WindowsSection from '@/components/addEstate/WindowsSection';
import FloorDetailsSection from '@/components/addEstate/FloorDetailsSection';
import BalconyLiftSection from '@/components/addEstate/BalconyLiftSection';
import PreviewSection from '@/components/addEstate/PreviewSection';
import { useAuth } from '@/components/providers';
import { createInput } from '@/components/utils/create-input';
import DescriptionSection from '@/components/addEstate/DescriptionSection';
import { toast } from 'react-toastify';
import { useFormState } from '../../components/utils/use-form-state';

const AddEstate: React.FC = () => {
  const { formData, setFormData } = useFormState();
  const { user } = useAuth();

  const [addPost] = useAddPostMutation();

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked,
    }));
  };

  const handleFileChange = (name: string, files: FileList | null) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? Array.from(files) : [],
    }));
  };

  const handleInputChange = (name: string, value: string, type: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'number' ? parseInt(value) || 0 : value,
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement | HTMLSelectElement;
    const checked = (e.target as HTMLInputElement).checked;
    const files = (e.target as HTMLInputElement).files;

    if (type === 'checkbox') {
      handleCheckboxChange(name, checked);
    } else if (type === 'file') {
      handleFileChange(name, files);
    } else {
      handleInputChange(name, value, type);
    }
  };

  const uploadImage = async (file: File) => {
    const uploadData = new FormData();
    uploadData.append('file', file);
    uploadData.append('upload_preset', 'REAL_ESTATE_PRESET');
    uploadData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_NAME || '');
    uploadData.append('api_key', process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '');

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`, {
        method: 'POST',
        body: uploadData,
      });

      if (!response.ok) {
        throw new Error(`Хуулахад алдаа гарлаа: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      return result.secure_url;
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error(`Файл хуулахад алдаа гарлаа: ${error}`);
      return null;
    }
  };

  const uploadImages = async (files: FileList) => {
    const uploadedImages = [];
    for (const file of Array.from(files)) {
      const imageUrl = await uploadImage(file);
      if (imageUrl) {
        uploadedImages.push(imageUrl);
      }
    }
    return uploadedImages;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElement = event.currentTarget;
    const fileInput = formElement.querySelector<HTMLInputElement>('input[type="file"]');
    const files = fileInput?.files;

    if (!files || files.length === 0) {
      toast.error('Зураг оруулна уу');
      return;
    }

    const uploadedImages = await uploadImages(files);

    const input = createInput(formData, user, uploadedImages);

    try {
      await addPost({ variables: { input } });
      toast.success('Зар нэмэгдлээ!');
    } catch (error) {
      console.error('Зар нэмэхэд алдаа гарлаа', error);
      toast.error(`Зар нэмэхэд алдаа гарлаа`, {
        autoClose: 2000,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex gap-8">
        <div className="w-[728px]">
          <PropertyDetails formData={formData} handleChange={handleChange} />
          <ImagesSection handleChange={handleChange} />
          <DescriptionSection formData={formData} handleChange={handleChange} />
          <RestroomsSection formData={formData} handleChange={handleChange} />
          <TownDetails formData={formData} handleChange={handleChange} />
          <WindowsSection formData={formData} handleChange={handleChange} />
          <FloorDetailsSection formData={formData} handleChange={handleChange} />
          <BalconyLiftSection formData={formData} handleChange={handleChange} />
        </div>
        <PreviewSection formData={formData} />
      </div>
    </form>
  );
};

export default AddEstate;
