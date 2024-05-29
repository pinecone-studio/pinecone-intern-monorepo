import React from 'react';
import { IoSend } from 'react-icons/io5';
import { usePublishCommentMutation } from '@/generated';
import { useFormik } from 'formik';

const CreateCommentsCard = ({ articleId }: { articleId: string }) => {
  const [publishComment] = usePublishCommentMutation();
  const formik = useFormik({
    initialValues: {
      email: '',
      name: '',
      comment: '',
      articleId: articleId,
      entityId: '123',
      entityType: 'user',
    },
    onSubmit: (values) => {
      publishComment({
        variables: {
          createInput: {
            name: values.name,
            email: values.email,
            comment: values.comment,
            articleId: values.articleId,
            entityId: values.entityId,
            entityType: values.entityType,
          },
        },
      });
    },
  });

  return (
    <div>
      <div className=" h-[250px] rounded-2xl  bg-white  " style={{ padding: ' var(--24-px-unit-6, 24px) var(--24-px-unit-6, 24px) var(--64-px-unit-16, 64px) var(--24-px-unit-6, 24px)' }}>
        <div className="">
          <input
            id="email-test"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            type="input"
            placeholder="Цахим хаягаа оруулна уу..."
            className="bg-white w-full py-[16px] border-b-2"
          />
          <input id="name-test" name="name" value={formik.values.name} onChange={formik.handleChange} type="input" placeholder="Таны нэр" className="bg-white w-full py-[16px] border-b-2" />
          <input
            id="comment-test"
            name="comment"
            value={formik.values.comment}
            onChange={formik.handleChange}
            type="input"
            placeholder="Энд сэтгэгдлээ бичнэ үү..."
            className="bg-white w-full py-[16px]"
          />
          <div className="grid justify-items-end">
            <button name="submitBtn" data-testid="create-comment-button" type="submit" onClick={() => formik.handleSubmit()}>
              <IoSend className="w-[20px] h-[20px]" />
            </button>
          </div>
        </div>
      </div>
      <div className="flex  gap-8 p-8">
        <div className="border-2 flex w-full h-1 justify-center "></div>
        <p className=" ">
          Сэтгэгдлүүд <span></span>
        </p>
        <div className="border-2 flex w-full h-1"></div>
      </div>
    </div>
  );
};

export default CreateCommentsCard;
