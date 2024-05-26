'use client';
import { useCreateSectionMutation, useDeleteSectionMutation, useGetSectionByLessonIdQuery } from '@/generated';
import GetSections from './_features/GetSections';
import AddSection from './_features/AddSection';
import Link from 'next/link';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { ArrowBackIcon } from '../../../public/assets/ArrowBackIcon';
const validatinSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  contentImage: yup.string(),
});

const SectionPage = () => {
  const router = useRouter();
  const [isPosted, setIsPosted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [lessonId, setLessonId] = useState('');
  const [courseId, setCourseId] = useState('');
  const [createSection] = useCreateSectionMutation();
  const [deleteSection] = useDeleteSectionMutation();
  useEffect(() => {
    setLessonId(localStorage.getItem('lessonID') || '');
    setCourseId(localStorage.getItem('courseID') || '');
  }, []);
  const { data, loading, refetch } = useGetSectionByLessonIdQuery({ variables: { getSectionByLessonIdId: lessonId } });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      thumbnail: '',
    },
    validationSchema: validatinSchema,
    onSubmit: async (values) => {
      await createSection({
        variables: {
          sectionInput: {
            lessonId: lessonId,
            title: values.title,
            description: values.description,
            contentImage: values.thumbnail,
            posted: isPosted,
          },
        },
      });
      refetch();
      formik.resetForm();
    },
  });
  const handleUpdateSectionPage = (id: string | undefined | null) => {
    if (id) {
      localStorage.setItem('sectionId', id);
      router.push('/update-section');
    } else {
      refetch();
    }
  };
  const handleDeleteSection = async (id: string | undefined | null) => {
    if (id) {
      setIsLoading(true);
      await deleteSection({ variables: { id } });
      setIsLoading(false);
    }
    refetch();
  };
  useEffect(() => {
    refetch();
    setIsLoading(false);
  }, [data, refetch]);

  return (
    <div className="flex flex-col bg-[#F7F7F8] px-20 min-h-screen dark:bg-[#121316f7] mt-0" data-testid="section-page-container">
      <div className="max-w-[1440px] mx-auto w-full">
        <Link
          href={`/${courseId || '/dashboard'}`}
          data-cy="handle-back-page"
          className=" flex flex-row items-center gap-1 w-[140px] h-fit py-4 stroke-[#121316] dark:stroke-[#ededed] dark:text-[#dedede]"
        >
          <ArrowBackIcon />
          Буцах
        </Link>
        <div className="flex flex-col gap-[4px] bg-[#fff] border-1 rounded-xl justify-center items-center p-6 dark:bg-[#2b2b2b]">
          <GetSections handleUpdateSectionPage={handleUpdateSectionPage} handleDeleteSection={handleDeleteSection} loading={loading} data={data} isLoading={isLoading} />
          <AddSection
            handleChange={formik.handleChange}
            title={formik.values.title}
            description={formik.values.description}
            thumbnail={formik.values.thumbnail}
            setFieldValue={formik.setFieldValue}
            setIsPosted={setIsPosted}
            handleSubmit={formik.handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default SectionPage;
