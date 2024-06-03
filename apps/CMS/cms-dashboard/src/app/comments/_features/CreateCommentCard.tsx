import { IoSend } from 'react-icons/io5';
import { usePublishCommentMutation } from '@/generated';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const validationSchema = yup.object({
  email: yup.string().email('Имэйл хаяг буруу байна').required('Имэйл хаягаа оруулна уу'),
});

const CreateCommentCard = ({ articleId, refetch }: { articleId: string; refetch: () => void }) => {
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
    validateOnChange: false,
    validateOnBlur: false,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      await publishComment({
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
      toast.success('Сэтгэгдэл амжилттай нэмэгдлээ.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
      });
      resetForm();
      refetch();
    },
  });

  return (
    <div className="h-[250px] rounded-2xl  bg-white   " style={{ padding: ' var(--24-px-unit-6, 24px) var(--24-px-unit-6, 24px) var(--64-px-unit-16, 64px) var(--24-px-unit-6, 24px)' }}>
      <div className="">
        <input
          id="comment-email-test-id"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          type="input"
          placeholder="Цахим хаягаа оруулна уу..."
          className="bg-white w-full py-[16px] border-b-2"
        />
        <input id="comment-name-test-id" name="name" value={formik.values.name} onChange={formik.handleChange} type="input" placeholder="Таны нэр" className="bg-white w-full py-[16px] border-b-2" />
        <input
          id="comment-test-id"
          name="comment"
          value={formik.values.comment}
          onChange={formik.handleChange}
          type="input"
          placeholder="Энд сэтгэгдлээ бичнэ үү..."
          className="bg-white w-full py-[16px]"
        />
        <div className="grid justify-items-end">
          <button id="create-comment-button-test-id" type="submit" onClick={() => formik.handleSubmit()} name="submitBtn">
            <IoSend className="w-[20px] h-[20px]  " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCommentCard;
