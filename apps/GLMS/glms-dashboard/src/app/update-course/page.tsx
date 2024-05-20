'use client';
import { ArrowLeftIcon } from '../../../public/assets/ArrowLeftIcon';
import { useRouter } from 'next/navigation';
import FileUploader from '../../components/FileUploader';
import { useEffect, useState } from 'react';
import { useGetCourseByIdQuery, useUpdateCourseMutation } from '@/generated';
import Loading from '../../components/Loading';
import { useFormik } from 'formik';
import * as yup from 'yup';
const UpdateCourse = () => {
  const router = useRouter();
  const [courseID, setCourseID] = useState('');
  const [updateCourse] = useUpdateCourseMutation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const courseId = localStorage.getItem('courseID');
      if (courseId !== null) {
        setCourseID(courseId);
      }
    }
  }, []);

  const id = courseID ? courseID : '';

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
      updateCourse({
        variables: {
          id: id,
          courseInput: {
            title: values.title,
            description: values.description,
            thumbnail: values.thumbnail,
          },
        },
      });
      router.push(`${id}`);
    },
  });

  const { data, loading } = useGetCourseByIdQuery({
    variables: { getCourseByIdId: id },
    skip: !id,
  });

  useEffect(() => {
    if (data && data.getCourseById) {
      const course = data.getCourseById;

      formik.setFieldValue('title', course.title);
      formik.setFieldValue('description', course.description);
      formik.setFieldValue('thumbnail', course.thumbnail);
    }
  }, [data]);

  if (loading) return <Loading />;

  return (
    <div data-testid="update-course-container" className="bg-[#F7F7F8] w-full flex justify-center py-6 border-t-2">
      <div className="w-[90%]">
        <div
          data-cy="handle-back-page"
          onClick={() => {
            router.push(`${id}`);
          }}
          className=" flex flex-row gap-[6px] mb-[26px] text-[18px]  font-semibold items-center cursor-pointer py-[10px] w-fit"
        >
          <ArrowLeftIcon /> {'Буцах'}
        </div>
        <div data-testid="update-course-form" className="w-[100%] bg-[white] rounded-xl py-10 px-8 flex flex-col gap-10">
          <div className="mb-4">
            <p className=" text-[28px] font-bold text-[#121316]">{'Сэдвийн ерөнхий мэдээлэл '}</p>
          </div>
          <div className=" flex flex-row gap-5 w-[100%] h-[100%] pb-10">
            <div className="  flex flex-col gap-10 w-[50%]">
              <div className=" gap-2 flex flex-col w-[100%]">
                <label className=" font-semibold text-[16px] color-[#121316]">{'Гарчиг'}</label>
                <input
                  className="w-[90%] h-[40px] border-[2px] rounded p-2 "
                  type="text"
                  name="title"
                  placeholder="Оруулна уу..."
                  data-cy="title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                ></input>
              </div>
              <div className="w-[100%] gap-2 flex flex-col">
                <label className="font-semibold text-[16px] color-[#121316]">{'Дэлгэрэнгүй'}</label>
                <textarea
                  className="w-[90%] border-[2px] rounded h-[150px] px-2"
                  data-cy="description"
                  name="description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  placeholder="Энд бичнэ үү..."
                />
              </div>
            </div>
            <div className="w-[50%] gap-2 flex flex-col ">
              <label className="font-semibold color-[#121316] text-[16px]">{'Хавтасны зураг'}</label>
              <FileUploader thumbnail={formik.values.thumbnail} setFieldValue={formik.setFieldValue} />
            </div>
          </div>
          <div className="w-[100%] flex justify-center mb-[30px]">
            <button
              name="submit-Btn"
              className={`bg-[#121316] rounded-lg w-[280px] h-[56px] text-white flex justify-center items-center btn`}
              data-cy="update-button"
              type="button"
              onClick={() => formik.handleSubmit()}
            >
              <p className="text-[18px] font-semibold hover:text-black">засах</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateCourse;
