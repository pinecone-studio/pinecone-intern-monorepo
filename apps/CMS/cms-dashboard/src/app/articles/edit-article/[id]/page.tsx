'use client';

import { Article, useGetArticleByIdQuery } from '../../../../../src/generated';
import { useParams } from 'next/navigation';
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

  const formik = useFormik({
    initialValues: {
      thumbnail: '',
      articleTitle: '',
      articleContent: '',
    },
    validationSchema: validationSchema,
    onSubmit: () => {},
  });

  useEffect(() => {
    if (data) {
      formik.setValues({
        thumbnail: '',
        articleTitle: data.getArticleByID.title || '',
        articleContent: data.getArticleByID.content || '',
      });
    }
  }, [data]);

  if (loading) return <h5>Loading...</h5>;
  if (error) return <h5>Error</h5>;

  const article = data?.getArticleByID as Article | undefined;

  return (
    <div data-cy="edit-article-page-cy" className="flex w-[100%] h-screen">
      <div className="w-[75%] flex flex-col px-28 py-[70px] bg-[#f2f2f3] gap-6">
        <ArrowBack />

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <Title title="Гарчиг өгөх" />
            <TitleInput
              name="articleTitle"
              placeholder="type article title"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.articleTitle}
              helperText={formik.errors.articleTitle}
              error={formik.errors.articleTitle}
            />
          </div>

          <div className="flex flex-col gap-3">
            <Title title="Нийтлэл бичих" />
            <ContentInput
              name="articleContent"
              placeholder="type article content"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.articleContent}
              helperText={formik.errors.articleContent}
              error={formik.errors.articleContent}
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

        <SubmitButton onClick={formik.handleSubmit} text="Ноорогт хадгалах" bgColor="#f6f6f6" />
        <SubmitButton onClick={formik.handleSubmit} text="Нийтлэх" bgColor="#D6D8D8" />
      </div>
    </div>
  );
};

export default Home;
