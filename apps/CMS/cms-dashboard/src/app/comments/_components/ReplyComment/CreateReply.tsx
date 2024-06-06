import { useFormik } from 'formik';
import { usePublishReplyMutation } from '@/generated';
import { toast } from 'react-toastify';
import { IoSend } from 'react-icons/io5';
import * as yup from 'yup';
type ReplyFormProps = {
  commentId: string;
  onReplySubmitted: () => void;
};
const validationSchema = yup.object({
  email: yup.string().email('Имэйл хаяг буруу байна').required('Имэйл хаягаа оруулна уу'),
});
const CreateReply = (props: ReplyFormProps) => {
  const [publishReply] = usePublishReplyMutation();
  const { commentId, onReplySubmitted } = props;

  const formik = useFormik({
    initialValues: {
      commentId: commentId,
      reply: '',
      email: '',
      parentId: '',
      name: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      await publishReply({
        variables: {
          createInput: {
            commentId,
            reply: values.reply,
            email: values.email,
            parentId: values.parentId,
            name: values.name,
          },
        },
      });
      toast.success('Сэтгэгдэл амжилттай нэмэгдлээ.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
      });
      resetForm();
      onReplySubmitted();
    },
  });

  return (
    <div>
      <div className="h-[250px] rounded-2xl mt-2 bg-white   " style={{ padding: ' var(--24-px-unit-6, 24px) var(--24-px-unit-6, 24px) var(--64-px-unit-16, 64px) var(--24-px-unit-6, 24px)' }}>
        <div className="">
          <input
            id="comment-email-test-id"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            type="input"
            placeholder="Цахим хаягаа оруулна уу..."
            className="bg-white w-full py-[16px] border-b-2 focus:outline-none "
          />
          <p className="flex justify-end text-[#C93131] text-[12px]">{formik.errors.email}</p>
          <input
            id="comment-name-test-id"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            type="input"
            placeholder="Таны нэр"
            className="bg-white w-full py-[16px] border-b-2 focus:outline-none"
          />
          <input
            id="comment-test-id"
            name="reply"
            value={formik.values.reply}
            onChange={formik.handleChange}
            type="input"
            placeholder="Энд сэтгэгдлээ бичнэ үү..."
            className="bg-white w-full py-[16px] focus:outline-none"
          />
          <div className="grid justify-items-end">
            <button id="create-reply-button-test-id" type="submit" onClick={() => formik.handleSubmit()} name="submitBtn">
              <IoSend className="w-[20px] h-[20px]  " />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateReply;
