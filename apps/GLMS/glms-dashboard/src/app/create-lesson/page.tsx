'use client';

import { East } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useCreateLessonMutation } from '@/generated/index';
import FileUploader from '../../components/FileUploader';
import PrevArrow from 'apps/GLMS/glms-dashboard/public/prev-arrow';

const validatinSchema = yup.object({
  title: yup.string().required(),
  description: yup.string().required(),
  thumbnail: yup.string().required(),
});

const LessonAdd = () => {
  const router = useRouter();
  const [createLesson] = useCreateLessonMutation();

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      thumbnail: '',
    },
    validationSchema: validatinSchema,
    onSubmit: (values) => {
      createLesson({
        variables: {
          lessonInput: {
            title: values.title,
            thumbnail: values.thumbnail,
            position: 0,
            courseId: '',
          },
        },
      });
      router.push('/dashboard');
    },
  });

  return (
    <div className="bg-[#ECEDF0] h-screen">
      <div className="w-[85vw] m-auto pt-[2.5vh]">
        <div
          onClick={() => {
            router.push('/dashboard');
          }}
          className="gap-6 mb-[2.5vh] cursor-pointer text-[18px] font-semibold flex items-center "
        >
          <PrevArrow /> {'Нүүр'}
        </div>
        <div className="w-full bg-white rounded-xl px-6 pt-12 h-[70vh]">
          <div className="max-w-[668px] w-full m-auto p-10 border-[2px #D6D8DB dashed] rounded-2">
            <div className="w-full gap-2">
              <p className="font-semibold text-base text-[#121316]">{'Хичээлийн гарчиг'}</p>
              <input name="title" onChange={formik.handleChange} value={formik.values.title} type="text" placeholder="Оруулна уу..." />
            </div>

            <div className="w-full gap-2">
              <p className="font-semibold text-[#121316]">{'Хичээлийн зураг'}</p>
              <FileUploader thumbnail={formik.values.thumbnail} setFieldValue={formik.setFieldValue} />
            </div>
          </div>

          <div className="w-full items-center text-end">
            <button
              onClick={() => {
                formik.handleSubmit();
              }}
              className="btn w-fit gap-7 rounded-lg py-4 px-24 "
              disabled={!formik.values.title || !formik.values.thumbnail}
            >
              {'Хадгалах'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonAdd;
