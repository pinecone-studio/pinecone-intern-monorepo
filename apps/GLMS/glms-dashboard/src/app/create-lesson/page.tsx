'use client';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useCreateLessonMutation } from '@/generated';
import FileUploader from '../../components/FileUploader';
import { PrevArrow } from '../../../public/assets/PrevArrow';
import { useEffect, useState } from 'react';

const validatinSchema = yup.object({
  title: yup.string().required(),
  thumbnail: yup.string().required(),
});

const LessonAdd = () => {
  const router = useRouter();
  const [courseId, setCourseId] = useState<string | null>(null);
  const [createLesson] = useCreateLessonMutation();

  const formik = useFormik({
    initialValues: {
      title: '',
      thumbnail: '',
    },
    validationSchema: validatinSchema,
    onSubmit: (values) => {
      if (!courseId) return router.push('/dashboard');
      createLesson({
        variables: {
          lessonInput: {
            title: values.title,
            thumbnail: values.thumbnail,
            position: 0,
            courseId,
          },
        },
      });
      router.push(`/${courseId || 'dashboard'}`);
    },
  });

  useEffect(() => {
    setCourseId(localStorage.getItem('courseID'));
  }, []);

  return (
    <div data-testid="create-lesson-container" className="bg-[#F7F7F8] h-[92vh]">
      <div className="w-[85vw] m-auto pt-[2.5vh] ">
        <div
          data-testid="test-back-div"
          onClick={() => {
            router.push(`/${courseId || 'dashboard'}`);
          }}
          className="gap-6 mb-[2.5vh] cursor-pointer text-[18px] font-semibold flex items-center "
        >
          <PrevArrow /> {'Нүүр'}
        </div>
        <div className="w-full bg-white rounded-xl pt-12">
          <div className="px-6">
            <div className="max-w-[668px] w-full m-auto rounded-xl p-10" style={{ border: '2px #D6D8DB dashed' }}>
              <div className="w-full gap-2">
                <p className="font-semibold text-base text-[#121316] mb-2">{'Хичээлийн гарчиг'}</p>
                <input
                  type="text"
                  id="title-test-of-lesson"
                  className="input input-bordered w-full"
                  name="title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  placeholder="Оруулна уу..."
                />
              </div>
              <div className="w-full gap-2 mt-6">
                <p className="font-semibold text-[#121316] mb-2">{'Хичээлийн зураг'}</p>
                <FileUploader thumbnail={formik.values.thumbnail} setFieldValue={formik.setFieldValue} />
              </div>
            </div>
          </div>
          <hr className="mt-8 mb-5" />
          <div className="px-6">
            <div className="w-full flex items-center justify-end m-auto max-w-[668px]">
              <button
                type="button"
                data-testid="create-button-of-lesson"
                onClick={() => formik.handleSubmit()}
                className="btn w-fit gap-7 rounded-lg py-4 px-24"
                disabled={!formik.values.title || !formik.values.thumbnail}
              >
                {'Хадгалах'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LessonAdd;
