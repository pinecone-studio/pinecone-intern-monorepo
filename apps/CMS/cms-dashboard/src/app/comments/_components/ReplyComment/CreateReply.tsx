import { useFormik } from 'formik';
import { usePublishReplyMutation } from '@/generated';
import { toast } from 'react-toastify';
import { IoSend } from 'react-icons/io5';

type ReplyFormProps = {
  commentId: string;
  refetch: () => void;
};

const CreateReply = ({ commentId, refetch }: ReplyFormProps) => {
  const [publishReply] = usePublishReplyMutation();
  const formik = useFormik({
    initialValues: {
      commentId: commentId,
      reply: '',
      email: '',
      parentId: '',
      name: '',
    },
    onSubmit: async (values) => {
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
      formik.resetForm();
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
          name="reply"
          value={formik.values.reply}
          onChange={formik.handleChange}
          type="input"
          placeholder="Энд сэтгэгдлээ бичнэ үү..."
          className="bg-white w-full py-[16px]"
        />
        <div className="grid justify-items-end">
          <button id="create-reply-button-test-id" type="submit" onClick={() => formik.handleSubmit()} name="submitBtn">
            <IoSend className="w-[20px] h-[20px]  " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateReply;
