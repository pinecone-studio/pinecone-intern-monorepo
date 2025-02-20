'use client';
import React, { useEffect } from 'react';
import { useAddPostMutation } from '@/generated';
import TownDetails from '@/components/addEstate/TownDetails';
import PropertyDetails from '@/components/addEstate/PropertyDetails';
import ImagesSection from '@/components/addEstate/ImagesSection';
import RestroomsSection from '@/components/addEstate/RestroomsSection';
import WindowsSection from '@/components/addEstate/WindowsSection';
import FloorDetailsSection from '@/components/addEstate/FloorDetailsSection';
import BalconyLiftSection from '@/components/addEstate/BalconyLiftSection';
import PreviewSection from '@/components/addEstate/PreviewSection';
import DescriptionSection from '@/components/addEstate/DescriptionSection';
import { useAuth } from '@/components/providers';
import { createInput } from '@/components/utils/create-input';
import { toast } from 'react-toastify';
import { useFormState } from '../../components/utils/use-form-state';
import { useRouter } from 'next/navigation';

interface CloudinaryResponse {
  secure_url: string;
}

interface CloudinaryError extends Error {
  status?: number;
  statusText?: string;
}

const createUploadData = (file: File): FormData => {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('upload_preset', 'REAL_ESTATE_PRESET');
  return fd;
};

const handleUploadError = (error: unknown): null => {
  // Only show the error toast if you really need to warn the user.
  if (error instanceof Error && process.env.NEXT_PUBLIC_SHOW_UPLOAD_ERROR === 'true') {
    toast.error(`Файл хуулахад алдаа: ${error.message}`);
  }
  return null;
};

const getFileInput = () => {
  const form = document.querySelector('form');
  const fileInput = form?.querySelector<HTMLInputElement>('input[type="file"]');
  return { files: fileInput?.files };
};

const submitPost = async (addPost: any, input: any, router: any) => {
  const resp = await addPost({ variables: { input } });
  if (!resp.data?.addPost) {
    throw new Error('Post submission failed');
  }
  toast.success('Зар амжилттай нэмэгдлээ');
  router.push('/my-estates');
};

const AddEstate: React.FC = () => {
  const { formData, setFormData } = useFormState();
  const { user } = useAuth();
  const [addPost] = useAddPostMutation();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.warning('Та нэвтэрч орно уу');
      router.push('/');
    }
  }, []);

  const handleFileChange = (name: string, files: string[] | null) => setFormData((prev) => ({ ...prev, [name]: files || [] }));

  const handleInputChange = (name: string, value: string, type: string | undefined) =>
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? Number(value.replace(/^0+/, '')) || 0 : value,
    }));
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement | HTMLSelectElement | { name: string; value: string[]; type: string | undefined };
    typeof value === 'object' ? handleFileChange(name, value) : handleInputChange(name, value, type);
  };
  const uploadImage = async (file: File): Promise<string | null> => {
    const data = createUploadData(file);
    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload`, { method: 'POST', body: data });
      if (!res.ok) {
        const err = new Error(`Хуулахад алдаа: ${res.status} ${res.statusText}`) as CloudinaryError;
        err.status = res.status;
        err.statusText = res.statusText;
        throw err;
      }
      const result = (await res.json()) as CloudinaryResponse;
      return result.secure_url;
    } catch (error) {
      return handleUploadError(error);
    }
  };
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).uploadImage = uploadImage;
    }
  }, [uploadImage]);

  const uploadImages = async (files: FileList): Promise<string[]> => {
    const uploads = Array.from(files).map(uploadImage);
    const results = await Promise.all(uploads);
    return results.filter((url): url is string => url !== null);
  };

  const validateFiles = (files: FileList | null | undefined): boolean => {
    if (!files?.length) {
      toast.error('Зураг оруулна уу');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event?: React.FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    const { files } = getFileInput();

    if (!validateFiles(files)) {
      return;
    }

    try {
      const uploadedImages = await uploadImages(files as FileList);
      const input = createInput(formData, user, uploadedImages);
      await submitPost(addPost, input, router);
    } catch (error: any) {
      console.error('Error adding post:', error);
      const errorMessage = error.message?.includes('Post submission failed') ? 'Зар нэмэхэд алдаа гарлаа' : 'Файл хуулахад алдаа гарлаа';
      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex gap-8">
        <div className="w-[728px]">
          <PropertyDetails formData={formData} handleChange={handleChange} />
          <ImagesSection formData={formData} handleChange={handleChange} />
          <DescriptionSection formData={formData} handleChange={handleChange} />
          <TownDetails formData={formData} handleChange={handleChange} />
          <WindowsSection formData={formData} handleChange={handleChange} />
          <RestroomsSection formData={formData} handleChange={handleChange} />
          <FloorDetailsSection formData={formData} handleChange={handleChange} />
          <BalconyLiftSection formData={formData} handleChange={handleChange} />
        </div>
        <PreviewSection formData={formData} onSubmit={handleSubmit} isEdit={false} />
      </div>
      <button type="submit" data-cy="submit-btn" style={{ display: 'none' }}>
        Submit
      </button>
    </form>
  );
};

export default AddEstate;
