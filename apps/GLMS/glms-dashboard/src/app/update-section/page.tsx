'use client';
import { useGetSectionByIdQuery, useUpdateSectionMutation } from '@/generated';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ArrowLeftIcon } from '../../../public/assets/ArrowLeftIcon';
import { useRouter } from 'next/navigation';
import FileUploader from '../../components/FileUploader';

const UpdateSection = () => {
  const router = useRouter();
  const [updateSection] = useUpdateSectionMutation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.getItem('sectionId');
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
      });
      router.push('section');
    },
  });

  const { data, loading } = useGetSectionByIdQuery({
    variables: { id: id },
  });

  useEffect(() => {
    if (data && data.getSectionById) {
      const section = data.getSectionById;
      formik.setFieldValue('title', section.title);
      formik.setFieldValue('description', section.description);
      formik.setFieldValue('thumbnail', section.contentImage);
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  return (
    <div data-testid="update-section-page-container" className="flex flex-col justify-center bg-[#F7F7F8] px-20" >
      <div data-cy="handle-back-page" onClick={() => router.push('/section')} className=" flex flex-row justify-center items-center gap-1 w-[140px] h-fit py-4">
        <ArrowLeftIcon />
        <p>Нүүр</p>
      </div>
      <div data-testid="update-section-form" className="flex flex-col gap-[4px] bg-[#fff] border-1 rounded-[4px] justify-center items-center p-6">
        <div className="'flex flex-col  gap-4 border-2 border-dashed rounded-4 p-8 border-[#D6D8DB] rounded-[8px]">
          <div className="flex flex-col py-2">
            <p className="font-bold">Хэсгийн гарчиг</p>
            <input
              data-testid="title"
              className="w-[588px] h-fit border rounded-[4px] p-2"
              type="text"
              name="title"
              placeholder="Оруулна уу..."
              id="title-test"
              onChange={formik.handleChange}
              value={formik.values.title}
            ></input>
          </div>
          <div className="flex flex-col py-2">
            <p className="font-bold">Дэлгэрэнгүй</p>
            <textarea
              data-testid="description"
              className="w-[588px] h-[160px] border rounded-[4px] p-2"
              id="description-test"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
              placeholder="Энд бичнэ үү..."
            ></textarea>
          </div>
          <div className="flex flex-col py-2">
            <p className="font-bold"> Хэсгийн зураг</p>
            <FileUploader thumbnail={formik.values.thumbnail} setFieldValue={formik.setFieldValue} />
          </div>
        </div>
        <div className="flex gap-4 jutify-center items-center py-4">
          <button
            data-cy="update-section-handle-btn"
            className="px-6 py-2 bg-black text-white rounded-[8px] flex items-center justify-center text-[20px] pb-2 hover:bg-[#D6D8DB] hover:text-black hover:cursor:pointer"
            onClick={() => formik.handleSubmit()}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};
export default UpdateSection;
