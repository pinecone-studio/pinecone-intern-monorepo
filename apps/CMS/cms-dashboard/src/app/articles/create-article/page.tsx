'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Input from '../_components/create-article/Input';
import RichTextEditor from '../_components/create-article/RichTextEditor';
import CustomButton from '../_components/create-article/CustomButton';
import RightSide from '../_features/create-article/RightSide';
import BackButton from '../_components/create-article/BackButton';
import { useCreateArticleMutation } from '../../../generated';

const validationSchema = yup.object({
  title: yup.string().required('Та гарчгаа оруулна уу'),
  content: yup.string().required('Та нийтлэлээ оруулна уу'),
  coverPhoto: yup.string().required('Та зураг сонго нуу'),
  category: yup.string(),
});

const CreateArticle = () => {
  const router = useRouter();
  const [commentPermission, setCommentPermission] = useState(true);
  const [createArticle, { loading: creationLoading }] = useCreateArticleMutation();
  // const author = '661c68e36837efa536464cb5';
  // const status = 'PUBLISHED';
  // const slug = 'slug';

  const handleSubmit = () => {
    console.log(commentPermission);
    formik.handleSubmit();
  };

  const handleback = () => {
    router.push('/');
  };

  const handleRichTextChange = (value: string) => {
    formik.setFieldValue('content', value);
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
      coverPhoto: '',
      category: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      handleCreateArticle(values.title, values.content);
    },
  });

  console.log(formik.values);

  const handleCreateArticle = async () => {
    await createArticle({
      variables: {
        articleInput: { title, coverPhoto, content, author, category, status, slug, commentPermission },
      },
    });
  };

  return (
    <div data-cy="create-article-main-container" className=" w-full h-screen flex justify-between">
      <div className="flex flex-col bg-[#F7F7F8] pl-[92px] pr-[82px] pt-[66px] gap-12  w-full">
        <div className=" flex flex-col gap-[18px]">
          <BackButton onClick={handleback} />
          <div className=" flex flex-col gap-[15px]">
            <p className=" text-lg font-semibold">Гарчиг өгөх</p>
            <Input
              type="text"
              name="title"
              placeholder="Энд гарчгаа бичнэ үү..."
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.title}
              helpertext={formik.errors.title}
            />
          </div>
        </div>
        <RichTextEditor content={formik.values['content']} onChange={handleRichTextChange} />
      </div>
      <div className=" flex flex-col justify-between w-[388px]">
        <RightSide
          name="category"
          setCategory={formik.handleChange}
          value={formik.values.category}
          coverPhoto={formik.values.coverPhoto}
          setCoverPhoto={formik.setFieldValue}
          commentPermission={commentPermission}
          setCommentPermission={setCommentPermission}
        />
        <div className=" flex flex-col p-6 gap-6 border-t">
          <CustomButton disabled={!formik.isValid} label="Ноорогт хадгалах" bgColor="primary" onClick={handleSubmit} />
          <CustomButton disabled={!formik.isValid} label="Нийтлэх" bgColor="secondary" />
        </div>
      </div>
    </div>
  );
};

export default CreateArticle;
