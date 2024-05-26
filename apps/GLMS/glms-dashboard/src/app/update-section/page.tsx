'use client';
import { useGetSectionByIdQuery, useUpdateSectionMutation } from '@/generated';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ArrowLeftIcon } from '../../../public/assets/ArrowLeftIcon';
import { useRouter } from 'next/navigation';
import FileUploader from '../../components/FileUploader';
import Loading from '../../components/Loading';
import { toast } from 'react-toastify';

const UpdateSection = () => {
  const router = useRouter();
  const [sectionID, setSectionID] = useState('');
  const [isPosted, setIsPosted] = useState(false);
  const [updateSection] = useUpdateSectionMutation();
  const status = ['Нийтлэх', 'Нийтлэлийг цуцлах'];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const sectionId = localStorage.getItem('sectionId');
      if (sectionId !== null) {
        setSectionID(sectionId);
      }
    }
  }, []);

  const id = sectionID ? sectionID : '';

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
      if (id) {
        updateSection({
          variables: {
            id: id,
            sectionInput: {
              title: values.title,
              description: values.description,
              contentImage: values.thumbnail,
              posted: isPosted,
            },
          },
        });
      }
      router.push('/section');
      toast.success('Мэдээлэл амжилттай засагдлаа', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
      });
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

  if (loading) return <Loading />;
  return (
    <div data-testid="update-section-page-container" className="flex flex-col bg-[#F7F7F8] px-20 h-screen dark:bg-[#121316f7]">
      <div className="max-w-[1440px] mx-auto">
        <div data-cy="handle-back-page" onClick={() => router.push('/section')} className=" flex flex-row gap-1 w-[140px] h-fit py-4 cursor-pointer dark:text-[#dedede]">
          <div className="rotate-180 fill-black dark:fill-[#dedede]">
            <ArrowLeftIcon />
          </div>
          Буцах
        </div>
        <div data-testid="update-section-form" className="flex flex-col gap-[4px] bg-[#fff] border-1 rounded-xl p-6 dark:bg-[#2b2b2b]">
          <div className="text-[#9f9f9f] flex justify-between max-w-[656px] w-full">
            <div>
              <span className="font-bold">Төлөв: </span>
              <span className={`${data?.getSectionById?.posted == true ? 'text-green-400' : 'text-yellow-400'}`}>{data?.getSectionById?.posted == true ? 'Нийтлэгдсэн' : 'Нийтлэгдээгүй'}</span>
            </div>
            <div>
              <span className="font-bold">Үүссэн огноо: </span> {data?.getSectionById?.createdAt.slice(0, 10)}
            </div>
          </div>
          <div className="'flex flex-col  gap-4 border-2 border-dashed rounded-4 p-8 border-[#D6D8DB] dark:border-[#3d3d3def] rounded-[8px] dark:text-[#dedede]">
            <div className="flex flex-col py-2">
              <p className="font-bold mb-2">Хэсгийн гарчиг</p>
              <input
                data-cy="update-section-title"
                test-id="title-input"
                className="w-[588px] h-fit border rounded-[4px] p-2 object-cover dark:bg-[#3d3d3def] dark:text-[#dedede] border-none outline-none"
                type="text"
                name="title"
                placeholder="Оруулна уу..."
                id="title-test"
                onChange={formik.handleChange}
                value={formik.values.title}
              ></input>
            </div>
            <div className="flex flex-col py-2">
              <p className="font-bold mb-2">Дэлгэрэнгүй</p>
              <textarea
                data-cy="update-section-description"
                test-id="description-input"
                className="w-[588px] h-[160px] border rounded-[4px] p-2 dark:bg-[#3d3d3def] dark:text-[#dedede] border-none outline-none"
                id="description-test"
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                placeholder="Энд бичнэ үү..."
              ></textarea>
            </div>
            <div className="flex flex-col py-2">
              <p className="font-bold mb-2">Хэсгийн зураг</p>
              <FileUploader thumbnail={formik.values.thumbnail} setFieldValue={formik.setFieldValue} />
            </div>
          </div>

          <div className="flex w-full max-w-[1140px] justify-between items-center mt-5">
            {status.map((item, index) => {
              return (
                <button
                  key={index}
                  name="submitBtn"
                  data-cy="update-section-handle-btn"
                  onClick={() => {
                    item === 'Нийтлэх' ? setIsPosted(true) : setIsPosted(false);
                    formik.handleSubmit();
                  }}
                  className={`${
                    item == 'Нийтлэх'
                      ? 'bg-black hover:bg-black text-white dark:hover:bg-[#3d3d3def] dark:border-[#515151] dark:bg-[#4a4a4a]'
                      : 'btn-outline hover:bg-[#f0f0f0] hover:text-black dark:text-[#dedede] dark:hover:bg-[#292929] dark:border-[#515151] dark:bg-[#2b2b2b]'
                  } btn rounded-lg w-[280px] h-[56px]  flex justify-center items-center `}
                  data-testid="create-button"
                  disabled={!formik.values.title || !formik.values.description || !formik.values.thumbnail}
                >
                  <p className="text-[18px] font-semibold">Засах ба {item}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
export default UpdateSection;
