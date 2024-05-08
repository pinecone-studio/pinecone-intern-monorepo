'use client';

import { Article, useGetArticleByIdQuery } from '../../../../../src/generated';
import { useParams } from 'next/navigation';
import { SubmitButton, Title, ToggleButtonForCommnent, ArrowBack } from './_components/index';
import { TitleInput } from './_components/TitleInput';
import { ContentInput } from './_components/ContentInput';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { FileUpload } from './_components/FileUpload';

const validatinSchema = yup.object({
  thumbnail: yup.string().required(),
});

const Home = () => {
  const formik = useFormik({
    initialValues: {
      thumbnail: '',
    },
    validationSchema: validatinSchema,
    onSubmit: () => {},
  });

  const { id } = useParams();
  const { data, loading, error } = useGetArticleByIdQuery({ variables: { getArticleByIdId: id } });
  if (loading) return <h5>Loading...</h5>;
  if (error) return <h5>Error</h5>;
  const article = data?.getArticleByID as Article | undefined;

  return (
    <div data-cy="edit-article-page-cy" className="flex w-[100%] h-screen">
      <div className="w-[80%] flex flex-col px-28 py-[70px] bg-[#f2f2f3] gap-6">
        <ArrowBack />

        <div className="flex flex-col gap-10">
          <p className="font-bold">{article?.title}</p>
          <div className="flex flex-col gap-3">
            <Title title="Гарчиг өгөх" />
            <TitleInput />
          </div>

          <div className="flex flex-col gap-3">
            <Title title="Нийтлэл бичих" />
            <ContentInput />
          </div>
        </div>
      </div>

      <div className="w-[20%] flex flex-col justify-between">
        <div className="flex flex-col">
          <div className="flex flex-col gap-3 p-6 border-b-[1px] border-[#ECEDF0]">
            <Title title="Ангилал" />
            <TitleInput />
          </div>
          <FileUpload thumbnail={formik.values.thumbnail} setFieldValue={formik.setFieldValue} />
          <ToggleButtonForCommnent isChecked={article?.commentPermission as boolean} />
        </div>

        <SubmitButton text="Ноорогт хадгалах" />
        <SubmitButton text="Нийтлэх" />
      </div>
    </div>
  );
};

export default Home;
