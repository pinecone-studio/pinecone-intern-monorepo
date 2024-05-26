'use client';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useCreateCourseMutation } from '@/generated';
import FileUploader from '../../components/FileUploader';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ArrowBackIcon } from '../../../public/assets/ArrowBackIcon';
const validatinSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  thumbnail: yup.string().required(),
});

const CourseAdd = () => {
  const router = useRouter();
  const [status] = useState(['Ноорог', 'Хичээл']);
  const [statusSelected, setStatusSelected] = useState<string | null>(null);
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
            status: statusSelected,
          },
        },
      });
      router.push('/dashboard');
    },
  });

  return (
    <div data-testid="create-course-container" className="bg-[#F7F7F8] w-full flex justify-center py-6 dark:bg-[#121316f7] h-screen dark:text-[#dedede]">
      <div className="w-[90%] max-w-[1440px]">
        <div
          data-testid="test-back-stack"
          onClick={() => {
            router.push('/dashboard');
          }}
          className=" flex flex-row gap-[6px] mb-[26px] text-[18px]  font-semibold items-center cursor-pointer py-[10px] w-fit"
        >
          <ArrowBackIcon /> {'Буцах'}
        </div>
        <div className="w-[100%] bg-white rounded-xl py-10 px-8 flex flex-col gap-10 dark:bg-[#2b2b2b]">
          <div className="mb-4">
            <p className=" text-[28px] font-bold text-[#121316] dark:text-[#dedede]">{'Сэдвийн ерөнхий мэдээлэл '}</p>
          </div>
          <div className=" flex flex-row gap-5 w-[100%] h-[100%] pb-10">
            <div className="  flex flex-col gap-10 w-[50%]">
              <div className=" gap-2 flex flex-col w-[100%]">
                <label className=" font-semibold text-[16px] color-[#121316]">{'Гарчиг'}</label>
                <input
                  className="w-[90%] h-[40px] border-[2px] rounded p-2 dark:bg-[#3d3d3def] dark:text-[#dedede] border-none outline-none "
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
                  className="w-[90%] border-[2px] rounded h-[100px] px-2 dark:bg-[#3d3d3def] dark:text-[#dedede] border-none outline-none"
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
          <div className="w-[100%] flex justify-between mb-[30px]">
            {status.map((item, index) => {
              const handleClick = () => {
                formik.handleSubmit();
                setStatusSelected(item);
                toast.success('Таны хичээл амжилттай нэмэгдлээ', {
                  position: 'top-center',
                  autoClose: 3000,
                  hideProgressBar: true,
                });
              };
              return (
                <button
                  key={index}
                  name="submitBtn"
                  className={`${
                    item == 'Ноорог'
                      ? 'btn-outline hover:bg-[#f0f0f0] hover:text-black dark:text-[#dedede] dark:hover:bg-[#292929] dark:border-[#515151] dark:bg-[#2b2b2b]'
                      : 'bg-black hover:bg-black text-white dark:hover:bg-[#3d3d3def] dark:border-[#515151] dark:bg-[#4a4a4a]'
                  } rounded-lg w-[280px] h-[56px]  flex justify-center items-center btn`}
                  data-testid="create-button"
                  onClick={handleClick}
                  disabled={!formik.values.title || !formik.values.description || !formik.values.thumbnail}
                >
                  <p className="text-[18px] font-semibold">{item === 'Хичээл' ? 'Хадгалах' : item}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseAdd;
