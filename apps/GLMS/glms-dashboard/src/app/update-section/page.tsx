'use client';
import { useGetSectionByIdQuery, useUpdateSectionMutation } from '@/generated';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ArrowLeftIcon } from '../../../public/assets/ArrowLeftIcon';
import { useRouter } from 'next/navigation';
import AddSection from '../section/_features/AddSection';

const UpdateSection = () => {
  const router = useRouter();
  const [updateSection] = useUpdateSectionMutation();
  const [sectionData, setSectionData] = useState('');
  const [section, setSection] = useState<{
    id?: string | null | undefined;
    title?: string | null | undefined;
    description?: string | null | undefined;
    contentImage?: string | null | undefined;
  }>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sectionId = localStorage.getItem('sectionId');
      if (sectionId) {
        setSectionData(sectionId);
      }
    }
  }, []);

  const sectionId = localStorage.getItem('sectionId');
  const id = sectionId ? sectionId : '';

  const validatinSchema = yup.object({
    title: yup.string().required(),
    description: yup.string().required(),
    contentImage: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      thumbnail: '',
    },
    validationSchema: validatinSchema,
    onSubmit: (values) => {
      updateSection({
        variables: {
          id: id,
          sectionInput: {
            title: values.title,
            description: values.description,
            contentImage: values.thumbnail,
          },
        },
      })
        .then((result) => {
        router.push("section")
          console.log('Section updated successfully:', result?.data?.updateSection);
        })
        .catch((error) => {
          console.error('Error updating section:', error);
        });
    },
  });

  const { data, loading, error } = useGetSectionByIdQuery({
    variables: { id: id },
  });

  useEffect(() => {
    if (data && data.getSectionById) {
      const section = data.getSectionById;
      setSection(section);
      formik.setFieldValue('title', section.title);
      formik.setFieldValue('description', section.description);
      formik.setFieldValue('thumbnail', section.contentImage);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching section data: {error.message}</p>;

  return (
    <div className="flex flex-col justify-center bg-[#F7F7F8] px-20" data-testid="section-page-container" >
         <div data-testid="handle-back-page" onClick={()=>router.push("section")}
        className=" flex flex-row justify-center items-center gap-1 w-[140px] h-fit py-4">
        
        <ArrowLeftIcon />
        <p>Нүүр</p>
      </div>
      <AddSection
       titleOnChange={formik.handleChange} 
       titleValue={formik.values.title} 
       descriptionOnChange={formik.handleChange}
       descriptionValue={formik.values.description}
       thumbnailOnChange={formik.values.thumbnail} 
       ThumbnailValue={formik.setFieldValue} 
       onClick={formik.handleSubmit}
       buttonName='Засах'
      />
    </div>
  );
};
export default UpdateSection;
