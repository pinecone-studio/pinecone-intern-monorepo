'use client';

import { useGetPostByIdQuery, PostStats, HouseTypeEnum, useUpdatePostMutation } from '@/generated';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import { useFormState } from '@/components/utils/use-form-state';
import { useEffect } from 'react';
import PropertyDetails from '@/components/addEstate/PropertyDetails';
import DescriptionSection from '@/components/addEstate/DescriptionSection';
import ImagesSection from '@/components/addEstate/ImagesSection';
import TownDetails from '@/components/addEstate/TownDetails';
import RestroomsSection from '@/components/addEstate/RestroomsSection';
import WindowsSection from '@/components/addEstate/WindowsSection';
import FloorDetailsSection from '@/components/addEstate/FloorDetailsSection';
import BalconyLiftSection from '@/components/addEstate/BalconyLiftSection';
import PreviewSection from '@/components/addEstate/PreviewSection';
import DeleteSection from '@/components/addEstate/DeleteSection';

const EditEstate = () => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
      toast.warning('Та нэвтэрч орно уу');
    }
  }, []);
  const { id } = useParams();
  const { formData, setFormData } = useFormState();
  const { data, loading, error } = useGetPostByIdQuery({
    variables: { id: id as string },
  });
  const [updatePost] = useUpdatePostMutation();

  const prepareLocationData = () => ({
    city: formData.city || '',
    district: formData.district || '',
    subDistrict: formData.subDistrict || '',
    address: formData.address || '',
  });

  const prepareDetailsData = () => ({
    completionDate: formData.completionDate || '',
    windowsCount: Number(formData.windowsCount),
    windowType: formData.windowType || '',
    floorMaterial: formData.floorMaterial || '',
    floorNumber: Number(formData.floorNumber),
    totalFloors: Number(formData.totalFloors),
    balcony: Boolean(formData.balcony),
    lift: Boolean(formData.lift),
  });

  const preparePropertyDetail = () => ({
    houseType: formData.houseType as HouseTypeEnum,
    size: formData.size,
    totalRooms: Number(formData.totalRooms),
    images: formData.images,
    garage: Boolean(formData.garage),
    restrooms: Number(formData.restrooms),
    location: prepareLocationData(),
    details: prepareDetailsData(),
  });

  useEffect(() => {
    if (data?.getPostById) {
      const rawDate = data.getPostById.propertyDetail.details?.completionDate;
      const formattedDate = rawDate ? new Date(rawDate).toISOString().split('T')[0] : '';

      setFormData({
        ...formData,
        title: data.getPostById.title,
        description: data.getPostById.description,
        price: data.getPostById.price,
        houseType: data.getPostById.propertyDetail.houseType,
        size: data.getPostById.propertyDetail.size,
        totalRooms: data.getPostById.propertyDetail.totalRooms,
        restrooms: data.getPostById.propertyDetail.restrooms,
        city: data.getPostById.propertyDetail.location.city,
        district: data.getPostById.propertyDetail.location.district,
        subDistrict: data.getPostById.propertyDetail.location.subDistrict,
        address: data.getPostById.propertyDetail.location.address,
        completionDate: formattedDate,
        windowsCount: data.getPostById.propertyDetail.details?.windowsCount,
        windowType: data.getPostById.propertyDetail.details?.windowType,
        floorMaterial: data.getPostById.propertyDetail.details?.floorMaterial,
        floorNumber: data.getPostById.propertyDetail.details?.floorNumber,
        totalFloors: data.getPostById.propertyDetail.details?.totalFloors,
        balcony: data.getPostById.propertyDetail.details?.balcony,
        lift: data.getPostById.propertyDetail.details?.lift,
        images: data.getPostById.propertyDetail.images,
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

  const handleUpdate = async () => {
    try {
      const response = await updatePost({
        variables: {
          id: id as string,
          input: {
            title: formData.title,
            description: formData.description,
            price: formData.price,
            status: PostStats.Pending,
            propertyDetail: preparePropertyDetail(),
          },
        },
      });

      if (response.data?.updatePost) {
        toast.success('Зар амжилттай шинэчлэгдлээ');
        router.push('/my-estates');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Зар шинэчлэхэд алдаа гарлаа');
    }
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Алдаа гарлаа</div>;
  if (!data?.getPostById) return <div className="text-red-500">Алдаа гарлаа</div>;

  return (
    <main className="container mx-auto px-4 py-8" data-cy="edit-estate-page">
      <form onSubmit={handleUpdate} data-cy="edit-estate-form">
        <div className="flex gap-8">
          <div className="max-w-2xl" data-cy="form-content">
            <h1 className="text-2xl font-bold mb-6" data-cy="page-title">
              Үл хөдлөхийн мэдээлэл шинэчлэх
            </h1>
            <PropertyDetails formData={formData} handleChange={handleChange} />
            <DescriptionSection formData={formData} handleChange={handleChange} />
            <ImagesSection formData={formData} handleChange={handleChange} />
            <TownDetails formData={formData} handleChange={handleChange} />
            <RestroomsSection formData={formData} handleChange={handleChange} />
            <WindowsSection formData={formData} handleChange={handleChange} />
            <FloorDetailsSection formData={formData} handleChange={handleChange} />
            <BalconyLiftSection formData={formData} handleChange={handleChange} />
          </div>
          <div className="sticky top-0 h-screen" data-cy="side-section">
            <PreviewSection formData={formData} onSubmit={handleUpdate} isEdit={true} />
            <DeleteSection postId={id as string} />
          </div>
        </div>
      </form>
    </main>
  );
};

export default EditEstate;
