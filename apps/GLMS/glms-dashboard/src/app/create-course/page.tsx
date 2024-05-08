'use client';

import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useCreateCourseMutation } from '@/generated';
import FileUploader from '../../components/FileUploader';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { ArrowLeftIcon } from '../../../public/assets/ArrowLeftIcon';
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
      router.push('/dashboard');
    },
  });

  return (
    <div data-testid="create-course-container" className="bg-[#F7F7F8] w-full flex justify-center py-6 border-t-2">
      <div className="w-[90%]">
        <div
          data-testid="test-back-stack"
          onClick={() => {
            router.push('/dashboard');
          }}
          className=" flex flex-row gap-[6px] mb-[26px] text-[18px]  font-semibold items-center cursor-pointer py-[10px] w-fit"
        >
          <ArrowLeftIcon /> {'Нүүр'}
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
                  className="w-[90%] h-[40px] border-[2px] rounded p-2 "
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
                <textarea
                  className="w-[90%] border-[2px] rounded h-[100px] px-2"
                  id="description-test"
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
          <div className="w-[100%] flex justify-end mt-[108px] mb-[56px]">
            <button
              className="bg-[#121316] rounded-lg w-[280px] h-[56px] text-white flex justify-center items-center"
              data-testid="create-button"
              onClick={() => {
                formik.handleSubmit();
              }}
              disabled={!formik.values.title || !formik.values.description || !formik.values.thumbnail}
            >
              <p className="text-[18px] font-semibold">Үргэлжлүүлэх</p>
              <ArrowForwardIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseAdd;
