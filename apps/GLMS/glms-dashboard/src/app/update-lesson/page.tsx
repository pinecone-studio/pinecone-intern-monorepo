'use client';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useUpdateLessonByInputMutation, useGetLessonInIdQuery } from '@/generated';
import FileUploader from '../../components/FileUploader';
import { PrevArrow } from '../../../public/assets/PrevArrow';
import { useEffect, useState } from 'react';
import Loading from '../../components/Loading';
import { toast } from 'react-toastify';

const UpdateLesson = () => {
  const router = useRouter();
  const [lessonID, setLessonID] = useState('');
  const [courseID, setCourseID] = useState('');
  const [updateLesson] = useUpdateLessonByInputMutation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const lessonId = localStorage.getItem('lessonID');
      const courseId = localStorage.getItem('courseID');
      if (lessonId !== null) {
        setLessonID(lessonId);
      }
      if (courseId !== null) {
        setCourseID(courseId);
      }
    }
  }, []);

  const ID = courseID ? courseID : '';
  const id = lessonID ? lessonID : '';

  const validatinSchema = yup.object({
    title: yup.string().required(),
    thumbnail: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      thumbnail: '',
    },
    validationSchema: validatinSchema,
    onSubmit: (values) => {
      updateLesson({
        variables: {
          id: id,
          lessonInput: {
            title: values.title,
            thumbnail: values.thumbnail,
          },
        },
      });
      router.push(`/${ID}`);
      toast.success('Таны хичээл амжилттай засагдлаа ', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
      });
    },
  });

  const { data, loading } = useGetLessonInIdQuery({
    variables: { id: id },
  });

  useEffect(() => {
    if (data && data.getLessonInId) {
      const section = data.getLessonInId;

      formik.setFieldValue('title', section.title);
      formik.setFieldValue('thumbnail', section.thumbnail);
    }
  }, [data]);

  if (loading) return <Loading />;

  return (
    <div data-testid="update-lesson-container" className="bg-[#F7F7F8] h-screen dark:bg-[#121316f7]">
      <div className="w-[85vw] m-auto pt-[2.5vh] max-w-[1440px] dark:text-[#dedede]">
        <div
          data-testid="handle-back-page"
          onClick={() => {
            router.push(`/${courseID || 'dashboard'}`);
          }}
          className="gap-6 mb-[2.5vh] cursor-pointer text-[18px] font-semibold flex items-center "
        >
          <PrevArrow /> {'Буцах'}
        </div>
        <div data-testid="update-lesson-form" className="w-full bg-white rounded-xl pt-12 dark:bg-[#2b2b2b]">
          <div className="px-6">
            <div className="max-w-[668px] w-full m-auto rounded-xl p-10 dark:border-[#3d3d3def] border-dashed border-2 border-[#D6D8DB]">
              <div className="w-full gap-2">
                <p className="font-semibold text-base text-[#121316] dark:text-[#dedede] mb-2">{'Хичээлийн гарчиг'}</p>
                <input
                  type="text"
                  id="title-test-of-lesson"
                  data-cy="update-lesson-title"
                  className="input input-bordered w-full dark:bg-[#3d3d3def] dark:text-[#dedede] dark:border-none dark:outline-none"
                  name="title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  placeholder="Оруулна уу..."
                />
              </div>
              <div className="w-full gap-2 mt-6">
                <p className="font-semibold text-[#121316] dark:text-[#dedede] mb-2">{'Хичээлийн зураг'}</p>
                <FileUploader thumbnail={formik.values.thumbnail} setFieldValue={formik.setFieldValue} />
              </div>
            </div>
          </div>
          <hr className="mt-8 mb-5 border-[#3d3d3def]" />
          <div className="px-6">
            <div className="w-full flex items-center justify-end m-auto max-w-[668px] pb-10">
              <button
                data-cy="update-lesson-handle-btn"
                type="button"
                onClick={() => formik.handleSubmit()}
                className="btn w-fit gap-7 rounded-lg py-4 px-24 bg-black hover:bg-black text-white dark:hover:bg-[#3d3d3def] dark:border-[#515151] dark:bg-[#4a4a4a]"
                disabled={!formik.values.title || !formik.values.thumbnail}
              >
                {'Засварлах'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdateLesson;
