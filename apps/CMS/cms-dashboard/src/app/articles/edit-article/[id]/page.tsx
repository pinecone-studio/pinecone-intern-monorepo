'use client';

import { Article, useGetArticleByIdQuery, useUpdateArticleMutation } from '../../../../../src/generated';
import { useParams, useRouter } from 'next/navigation';
import { InputLabel, ToggleButtonForCommnent, ArrowBack, validationSchema, CancelButton, UpdateArticleButton } from './_components/index';
import { TitleInput } from './_components/TitleInput';
import { ContentInput } from './_components/ContentInput';
import { useFormik } from 'formik';
import { FileUpload } from './_components/FileUpload';
import { CategorySelectInputFeature } from './_feature/CategorySelectInputFeature';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { ApolloError } from '@apollo/client';

const Home = () => {
  const { id } = useParams();
  const [updateArticle] = useUpdateArticleMutation();
  const { data, loading, error, refetch } = useGetArticleByIdQuery({ variables: { getArticleByIdId: id } });
  const article = data?.getArticleByID as Article | undefined;
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      category: '',
      coverPhoto: '',
      commentPermission: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await updateArticle({
          variables: {
            id: id,
            title: values.title,
            content: values.content,
            category: values.category,
            coverPhoto: values.coverPhoto,
            commentPermission: values.commentPermission,
          },
        });
        toast.success('Successfully updated', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
        });
        await refetch();
        router.push('/dashboard');
      } catch (error) {
        if (error instanceof ApolloError) {
          toast.error(error.graphQLErrors[0].message, {
            position: 'top-center',
            autoClose: 3000,
            hideProgressBar: true,
          });
        }
      }
    },
  });
  useEffect(() => {
    if (!article) return;
    formik.setFieldValue('title', article.title);
    formik.setFieldValue('content', article.content);
    formik.setFieldValue('category', article.category.id);
    formik.setFieldValue('coverPhoto', article.coverPhoto);
    formik.setFieldValue('commentPermission', article.commentPermission);
  }, [data]);

  if (loading)
    return (
      <div className="flex w-full justify-center py-8">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  if (error) return <h5>Error</h5>;

  return (
    <div data-cy="edit-article-page-cy" className="flex w-[100%] h-screen">
      <div className="w-[75%] flex flex-col px-28 py-[70px] bg-[#f2f2f3] gap-6">
        <ArrowBack />

        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-3">
            <InputLabel title="Гарчиг" />
            <TitleInput
              name="title"
              placeholder="type article title"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              helperText={String(formik.errors.title)}
              error={formik.touched.title && Boolean(formik.errors.title)}
            />
          </div>

          <div className="flex flex-col gap-3">
            <InputLabel title="Нийтлэл" />
            <ContentInput
              name="content"
              placeholder="type article content"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.content}
              helperText={formik.errors.content}
              error={formik.touched.content && Boolean(formik.errors.content)}
            />
          </div>
        </div>
      </div>

      <div className="w-[25%] flex flex-col justify-between">
        <div className="flex flex-col">
          <div className="p-6 border-b-[1px] border-[#ECEDF0]">
            <CategorySelectInputFeature
              name="category"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.category}
              helperText={formik.errors.category}
              defaultValue={article?.category.id}
            />
          </div>

          <FileUpload value={formik.values.coverPhoto} setFieldValue={formik.setFieldValue} />

          <ToggleButtonForCommnent
            name="commentPermission"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.commentPermission}
            helperText={formik.errors.commentPermission}
            defaultChecked={article?.commentPermission}
          />
        </div>

        <div className="p-6 flex flex-col gap-4">
          <CancelButton />
          <UpdateArticleButton handleClick={formik.handleSubmit} dirty={formik.dirty} isValid={formik.isValid} />
        </div>
      </div>
    </div>
  );
};

export default Home;
