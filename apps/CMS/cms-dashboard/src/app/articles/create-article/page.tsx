'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Input from '../_components/create-article/Input';
import RichTextEditor from '../_components/create-article/RichTextEditor';
import CustomButton from '../_components/create-article/CustomButton';
import RightSide from '../_features/create-article/RightSide';
import BackButton from '../_components/create-article/BackButton';
import CreateArticleModal from '../_components/create-article/CreateArticleModal';
import { useCreateArticleMutation } from '../../../generated';
import { toast } from 'react-toastify';
import jwt, { JwtPayload } from 'jsonwebtoken';
import {v4} from "uuid";

const validationSchema = yup.object({
  title: yup.string().required('Та гарчгаа оруулна уу'),
  content: yup.string().required('Та нийтлэлээ оруулна уу'),
  coverPhoto: yup.string().required('Та зураг сонго нуу'),
  category: yup.string().required('Та ангилалаа сонго нуу'),
});

const CreateArticle = () => {
  const [author, setAuthor] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [status, articleStatus] = useState('PUBLISHED');
  const router = useRouter();
  const [commentPermission, setCommentPermission] = useState(true);
  const [createArticle] = useCreateArticleMutation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const { id } = jwt.decode(token) as JwtPayload;
      setAuthor(id);
    }
  }, []);

  const handleback = () => {
    router.push('/');
  };

  const handleRichTextChange = (value: string) => {
    setFieldValue('content', value);
  };

  const { values, errors, isValid, setFieldValue, handleSubmit, handleChange, handleBlur, touched, resetForm } = useFormik({
    initialValues: {
      title: '',
      content: '',
      coverPhoto: '',
      category: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      handleCreateArticle(values.title, values.content, values.coverPhoto, values.category);
      resetForm();
      handleModalClose();
      handleback();
    },
  });

  const handleCreateArticle = async (title: string, content: string, coverPhoto: string, category: string) => {
    const slug = v4();
    await createArticle({
      variables: {
        articleInput: { commentPermission, title, content, coverPhoto, category, author, slug, status },
      },
    });
    toast.success(`${status} Successfully !`, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: true,
    });
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalOpen = () => {
    setShowModal(true);
  };

  return (
    <>
      <div data-cy="create-article-main-container" className=" w-full h-screen flex justify-between">
        <div className="flex flex-col bg-[#F7F7F8] pl-[92px] pr-[82px] pt-[66px] gap-12  w-full">
          <div className=" flex flex-col gap-[18px]">
            <div data-cy="back-button-container" onClick={handleback}>
              <BackButton />
            </div>
            <div className=" flex flex-col gap-[15px]">
              <p data-cy="title-cy-id" className=" text-lg font-semibold">
                Гарчиг өгөх
              </p>
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
            error={errors.category}
            helpertext={errors.category}
            imageUploaderError={errors.coverPhoto}
            ImageUploaderHelpertext={errors.coverPhoto}
          />
          <div className=" flex flex-col p-6 gap-6 border-t">
            <CustomButton disabled={touched.title ? !isValid : true} label="Ноорогт хадгалах" bgColor="secondary"  onClick={()=>{articleStatus('DRAFT'); handleSubmit()}} />
            <CustomButton disabled={touched.title ? !isValid : true} label="Нийтлэх" bgColor="primary" onClick={handleModalOpen} />
          </div>
        </div>
        <CreateArticleModal handleSubmit={handleSubmit} isVisible={showModal} onClose={handleModalClose} />
      </div>
    </>
  );
};

export default CreateArticle;
