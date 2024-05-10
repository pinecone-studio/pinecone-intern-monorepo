'use client';

import { Article, useGetArticleByIdQuery, useUpdateArticleMutation } from '../../../../../src/generated';
import { useParams, useRouter } from 'next/navigation';
import { SubmitButton, Title, ToggleButtonForCommnent, ArrowBack, validationSchema } from './_components/index';
import { TitleInput } from './_components/TitleInput';
import { ContentInput } from './_components/ContentInput';
import { useFormik } from 'formik';
import { FileUpload } from './_components/FileUpload';
import { CategorySelectInputFeature } from './_feature/CategorySelectInputFeature';
import { useEffect } from 'react';

const Home = () => {
  const { id } = useParams();
  const { data, loading, error } = useGetArticleByIdQuery({ variables: { getArticleByIdId: id } });
  const article = data?.getArticleByID as Article | undefined;
  const [updateArticle] = useUpdateArticleMutation();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      thumbnail: '',
      title: '',
      content: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      await updateArticle({
        variables: {
          id: id,
          title: values.title,
          content: values.content,
          category: '661c677c6837efa536464cab',
          commentPermission: false,
        },
      });
      router.push('/dashboard');
    },
  });

  useEffect(() => {
    formik.setFieldValue('title', article?.title);
    formik.setFieldValue('content', article?.content);
  }, [data]);

  if (loading) return <h5>Loading...</h5>;
  if (error) return <h5>Error</h5>;

  return (
    <div data-cy="edit-article-page-cy" className="flex w-[100%] h-screen">
      <div className="w-[75%] flex flex-col px-28 py-[70px] bg-[#f2f2f3] gap-6">
        <ArrowBack />

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <Title title="Гарчиг өгөх" />
            <TitleInput
              name="title"
              placeholder="type article title"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              helperText={formik.errors.title}
              error={formik.errors.title}
            />
          </div>

          <div className="flex flex-col gap-3">
            <Title title="Нийтлэл бичих" />
            <ContentInput
              name="content"
              placeholder="type article content"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.content}
              helperText={formik.errors.content}
              error={formik.errors.content}
            />
          </div>
        </div>
      </div>

      <div className="w-[25%] flex flex-col justify-between">
        <div className="flex flex-col">
          <div className="p-6 border-b-[1px] border-[#ECEDF0]">
            <CategorySelectInputFeature />
          </div>
          <FileUpload thumbnail={formik.values.thumbnail} setFieldValue={formik.setFieldValue} />
          <ToggleButtonForCommnent isChecked={article?.commentPermission as boolean} />
        </div>

        <div className="p-6 flex flex-col gap-4">
          <SubmitButton
            onClick={() => {
              router.push('/dashboard');
            }}
            text="Ноорогт хадгалах"
            bgColor="#888"
          />
          <SubmitButton
            onClick={() => {
              formik.handleSubmit();
            }}
            text="Нийтлэх"
            bgColor="black"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
