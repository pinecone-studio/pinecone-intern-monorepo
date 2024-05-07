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
import CreateArticleModal from '../_components/create-article/CreateArticleModal';
import { useCreateArticleMutation } from '../../../generated';

const validationSchema = yup.object({
  title: yup.string().required('Та гарчгаа оруулна уу'),
  content: yup.string().required('Та нийтлэлээ оруулна уу'),
  coverPhoto: yup.string().required('Та зураг сонго нуу'),
  category: yup.string().required('Та ангилалаа сонго нуу'),
});

const CreateArticle = () => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const [commentPermission, setCommentPermission] = useState(true);
  const [createArticle, { loading: creationLoading }] = useCreateArticleMutation();
  const author = '661c68e36837efa536464cb5';
  const status = 'PUBLISHED';
  const slug = 'slug';

  const handleback = () => {
    router.push('/');
  };

  const handleRichTextChange = (value: string) => {
    setFieldValue('content', value);
  };

  const handleCreateArticleSubmit = () => {
    handleSubmit();
  };

  const { values, errors, isValid, setFieldValue, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: {
      title: '',
      content: '',
      coverPhoto: '',
      category: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      handleCreateArticle(values.title, values.content, values.coverPhoto, values.category);
    },
  });

  const handleCreateArticle = async (title: string, content, coverPhoto, category) => {
    await createArticle({
      variables: {
        articleInput: { commentPermission, title, content, coverPhoto, category, author, slug, status },
      },
    });
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  console.log(values, commentPermission);
  return (
    <div data-cy="create-article-main-container" className=" w-full h-screen flex justify-between">
      <div className="flex flex-col bg-[#F7F7F8] pl-[92px] pr-[82px] pt-[66px] gap-12  w-full">
        <div className=" flex flex-col gap-[18px]">
          <BackButton onClick={handleback} />
          <div className=" flex flex-col gap-[15px]">
            <p className=" text-lg font-semibold">Гарчиг өгөх</p>
            <Input type="text" name="title" placeholder="Энд гарчгаа бичнэ үү..." value={values.title} onChange={handleChange} onBlur={handleBlur} error={errors.title} helpertext={errors.title} />
          </div>
        </div>
        <RichTextEditor content={values.content} onChange={handleRichTextChange} helpertext={errors.content} />
      </div>
      <div className=" flex flex-col justify-between w-[388px]">
        <RightSide
          name="category"
          setCategory={handleChange}
          value={values.category}
          coverPhoto={values.coverPhoto}
          setCoverPhoto={setFieldValue}
          commentPermission={commentPermission}
          setCommentPermission={setCommentPermission}
          onBlur={handleBlur}
          error={errors.category}
          helpertext={errors.category}
          imageUploaderError={errors.coverPhoto}
          ImageUploaderHelpertext={errors.coverPhoto}
        />
        <div className=" flex flex-col p-6 gap-6 border-t">
          <CustomButton disabled={!isValid} label="Ноорогт хадгалах" bgColor="secondary" onClick={handleCreateArticleSubmit} />
          <CustomButton disabled={!isValid} label="Нийтлэх" bgColor="primary" onClick={handleModalOpen} />
          <CreateArticleModal isVisible={showModal} onClose={handleModalClose} />
        </div>
      </div>
    </div>
  );
};

export default CreateArticle;
