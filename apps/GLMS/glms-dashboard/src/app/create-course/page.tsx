'use client';

import { East, KeyboardBackspace } from '@mui/icons-material';
import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useCreateCourseMutation } from '../../generated';
import FileUploader from '../../components/FileUploader';

const validatinSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  thumbnail: yup.string().required(),
});

const CourseAdd = () => {
  const router = useRouter();
  const [createCourse] = useCreateCourseMutation();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      thumbnail: '',
    },
    validationSchema: validatinSchema,
    onSubmit: (values) => {
      createCourse({
        variables: {
          courseInput: {
            title: values.title,
            description: values.description,
            thumbnail: values.thumbnail,
          },
        },
      });
      router.push('/dashboardOtherLab');
    },
  });

  return (
    <div data-testid="create-course-container" className="bg-[#ECEDF0]  h-[100%]  py-5  ">
      <div className="px-60">
        <div
          data-testid="test-back-stack"
          onClick={() => {
            router.push('/dashboardOtherLab');
          }}
          className=" flex flex-row gap-[6px] mb-[26px] text-lg  font-semibold items-center cursor-pointer"
        >
          <KeyboardBackspace /> {'Нүүр'}
        </div>
        <div className="w-[100%] bg-[white] rounded-xl py-10 px-8 flex flex-col gap-10">
          <div className="mb-8">
            <p className=" text-[28px] font-bold text-[#121316]">{'Сэдвийн ерөнхий мэдээлэл '}</p>
          </div>
          <div className=" flex flex-row gap-5 w-[100%] h-[100%] pb-10">
            <div className="  flex flex-col gap-10 w-[50%]">
              <div className=" gap-2 flex flex-col w-[100%]">
                <label className=" font-semibold text-[16px] color-[#121316]">{'Гарчиг'}</label>
                <input
                  className="w-[90%] h-[40px] border-[2px] rounded px-2 "
                  type="text"
                  name="title"
                  placeholder="Оруулна уу..."
                  id="title-test"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                ></input>
              </div>
              <div className="w-[100%] gap-2 flex flex-col">
                <label className="font-semibold text-[16px] color-[#121316]">{'Дэлгэрэнгүй'}</label>
                <input
                  className="w-[90%] border-[2px] rounded h-[80px] px-2"
                  id="description-test"
                  name="description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  type="text"
                  placeholder="Энд бичнэ үү..."
                />
              </div>
            </div>
            <div className="w-[50%] gap-2 flex flex-col ">
              <label className="font-semibold color-[#121316] text-[16px]">{'Хавтасны зураг'}</label>
              <FileUploader thumbnail={formik.values.thumbnail} setFieldValue={formik.setFieldValue} />
            </div>
          </div>
          <div className="w-[100%] flex justify-center ">
            <button
              className="bg-[#121316] rounded-lg w-[280px] h-[56px] text-white"
              data-testid="create-button"
              onClick={() => {
                formik.handleSubmit();
              }}
              disabled={!formik.values.title || !formik.values.description || !formik.values.thumbnail}
            >
              {'Үргэлжлүүлэх'} <East fontSize="small" />
            </button>
          </div>
        </div>
        <div className="flex  w-[100%] flex justify-center pt-5">
          <p className="text-[#1C2024]">© 2023 Pinecone</p>
        </div>
      </div>
    </div>
  );
};

export default CourseAdd;
