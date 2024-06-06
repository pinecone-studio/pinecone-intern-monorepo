import { useUpdateCommentMutation } from '@/generated';
import { useFormik } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';
type SignedReplyEditProps = {
  id?: string | undefined | null;
  comment?: string;
  onReplySubmitted: () => void;
};
const EditComment = (props: SignedReplyEditProps) => {
  const { comment, id, onReplySubmitted } = props;
  const [editedComment, setEditedComment] = useState(comment || '');
  const [updateComment] = useUpdateCommentMutation();
  const formik = useFormik({
    initialValues: {
      comment: editedComment,
    },
    onSubmit: async (values) => {
      await updateComment({
        variables: {
          updateInput: {
            _id: id!,
            comment: values.comment,
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
    setEditedComment(comment || '');
    onReplySubmitted();
  };

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <textarea name="comment" value={formik.values.comment} onChange={formik.handleChange} className="text-[18px] font-normal mt-2 w-full bg-white  p-2 rounded-md " />
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

export default EditComment;
