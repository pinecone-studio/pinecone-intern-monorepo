'use client';
import { useGetSectionByIdQuery, useUpdateSectionMutation } from '@/generated';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { ArrowLeftIcon } from '../../../public/assets/ArrowLeftIcon';
import { useRouter } from 'next/navigation';
import FileUploader from '../../components/FileUploader';
import Loading from '../../components/Loading';

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
    <div data-testid="update-section-page-container" className="flex flex-col justify-center bg-[#F7F7F8] px-20">
      <div data-cy="handle-back-page" onClick={() => router.push('/section')} className=" flex flex-row justify-center items-center gap-1 w-[140px] h-fit py-4">
        <ArrowLeftIcon />
        <p>Нүүр</p>
      </div>
      <div data-testid="update-section-form" className="flex flex-col gap-[4px] bg-[#fff] border-1 rounded-[4px] justify-center items-center p-6">
        <div className="text-[#9f9f9f] flex justify-between max-w-[656px] w-full">
          <div>
            <span className="font-bold">Төлөв: </span>
            <span className={`${data?.getSectionById?.posted == true ? 'text-green-400' : 'text-yellow-400'}`}>{data?.getSectionById?.posted == true ? 'Нийтлэгдсэн' : 'Нийтлэгдээгүй'}</span>
          </div>
          <div>
            <span className="font-bold">Үүссэн огноо: </span> {data?.getSectionById?.createdAt.slice(0, 10)}
          </div>
        </div>
        <div className="'flex flex-col  gap-4 border-2 border-dashed rounded-4 p-8 border-[#D6D8DB] rounded-[8px]">
          <div className="flex flex-col py-2">
            <p className="font-bold">Хэсгийн гарчиг</p>
            <input
              data-cy="update-section-title"
              test-id="title-input"
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
              data-cy="update-section-description"
              test-id="description-input"
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
                  item == 'Нийтлэх' ? 'bg-[#121316] hover:bg-[#252525] text-white' : 'btn-outline hover:bg-[#f0f0f0] hover:text-black'
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
  );
};
export default UpdateSection;
