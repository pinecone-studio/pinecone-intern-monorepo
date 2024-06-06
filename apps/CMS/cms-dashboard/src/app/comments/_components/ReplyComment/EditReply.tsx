import { useUpdateReplyMutation } from '@/generated';
import { useFormik } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';
type SignedReplyEditProps = {
  id?: string | undefined | null;
  reply?: string;
  onReplySubmitted: () => void;
};
const EditReply = (props: SignedReplyEditProps) => {
  const { reply, id, onReplySubmitted } = props;
  const [editedReply, setEditedReply] = useState(reply || '');
  const [updateReply] = useUpdateReplyMutation();
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      reply: editedReply,
    },
    onSubmit: async (values) => {
      await updateReply({
        variables: {
          updateInput: {
            _id: id!,
            reply: values.reply,
            name: values.name,
            email: values.email,
          },
        },
      });
      toast.success('Сэтгэгдэл амжилттай шинэчлэгдлээ.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
      });
      onReplySubmitted();
    },
  });
  const handleCancelEdit = () => {
    setEditedReply(reply || '');
    onReplySubmitted();
  };
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <textarea name="reply" value={formik.values.reply} onChange={formik.handleChange} className="text-[18px] font-normal mt-2 w-full bg-white  p-2 rounded-md " />
        <div className="flex justify-end gap-2">
          <button id="edit-decline-button-test-id" type="button" onClick={handleCancelEdit} className="bg-[#e4e4e4f2] text-black px-4 py-2 rounded">
            Цуцлах
          </button>
          <button type="submit" className="bg-black text-white px-4 py-2 rounded" id="edit-save-button-test-id">
            Хадгалах
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditReply;
