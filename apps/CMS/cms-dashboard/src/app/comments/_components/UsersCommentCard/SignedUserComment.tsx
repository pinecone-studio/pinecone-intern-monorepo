import { User, useDeleteCommentMutation, useGetRepliesByCommentIdQuery, useUpdateCommentMutation } from '@/generated';
import { AiOutlineDislike, AiOutlineLike } from 'react-icons/ai';
import { FaReply } from 'react-icons/fa';
import { MdOutlineEdit } from 'react-icons/md';
import { PiTrashSimpleBold } from 'react-icons/pi';
import jwt from 'jsonwebtoken';
import { useApolloClient } from '@apollo/client';
import { toast } from 'react-toastify';
import { useFormik } from 'formik';
import { useState } from 'react';
import CreateReply from '../ReplyComment/CreateReply';
import ReplyComment from '../ReplyComment';

type CommentsProps = {
  comment?: string;
  id?: string | undefined | null;
  refetch: () => void;
};

const SignedUserComment = (props: CommentsProps) => {
  const { comment, id, refetch } = props;
  const token = localStorage.getItem('token')!;
  const user = jwt.decode(token) as User;
  const client = useApolloClient();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation({ client });
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment || '');
  const [showReplyForm, setShowReplyForm] = useState(false);
  const { data, refetch: refetchReplies } = useGetRepliesByCommentIdQuery({ variables: { commentId: id! } });
  const replyComments = data?.getRepliesByCommentId || [];

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
      setIsEditing(false);
      refetch();
    },
  });

  const handleEditComment = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedComment(comment || '');
  };

  const HandleDeleteComment = async () => {
    if (user?.id && id) {
      await deleteComment({ variables: { deleteInput: { _id: user?.id && id } } });
      toast.success('Сэтгэгдэл амжилттай устгагдлаа.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
      });
      refetch();
    }
  };

  const handleReplySubmitted = () => {
    refetchReplies();
    setShowReplyForm(false);
  };

  return (
    <div>
      <div className="p-[32px] bg-white rounded-2xl  mt-6 ">
        <div className="items-stretch">
          <div>
            <div>
              <h1 className="text-[20px] font-bold">Таны сэтгэгдэл</h1>
              {isEditing ? (
                <form onSubmit={formik.handleSubmit}>
                  <textarea name="comment" value={formik.values.comment} onChange={formik.handleChange} className="text-[18px] font-normal mt-2 w-full bg-white  p-2 rounded-md " />
                  <div className="flex justify-end gap-2">
                    <button type="submit" className="bg-black text-white px-4 py-2 rounded" id="edit-save-button-test-id">
                      Хадгалах
                    </button>
                    <button id="edit-decline-button-test-id" type="button" onClick={handleCancelEdit} className="bg-[#FF0000] text-white px-4 py-2 rounded">
                      Цуцлах
                    </button>
                  </div>
                </form>
              ) : (
                <p className="text-[18px] font-normal mt-2">{comment}</p>
              )}
            </div>
          </div>
          <div className=" justify-between  grid grid-cols-2 h-[60px]">
            <div className="flex gap-[16px] ">
              <button id="edit-comment-button-test-id" onClick={handleEditComment} className="flex justify-center items-center gap-2 self-end">
                <MdOutlineEdit className="h-[20px] w-[20px]" />
                Засах
              </button>
              <button onClick={HandleDeleteComment} id="delete-comment-button-test-id" className="flex justify-center items-center gap-2 self-end">
                <PiTrashSimpleBold className="h-[20px] w-[20px]" id="delete-comment-button-test-id" />
                Устгах
              </button>
            </div>
            <div className="flex gap-[16px] justify-end">
              <button className="flex justify-center items-center gap-2 self-end">
                <AiOutlineLike className="h-[20px] w-[20px]" /> 0
              </button>
              <button className="flex justify-center items-center gap-2 self-end">
                <AiOutlineDislike className="h-[20px] w-[20px]" />0
              </button>
              <button className="flex justify-center items-center gap-2 self-end" onClick={() => setShowReplyForm(!showReplyForm)}>
                <FaReply /> Хариулах
              </button>
            </div>
          </div>
        </div>
      </div>
      {showReplyForm && <CreateReply commentId={id!} onReplySubmitted={handleReplySubmitted} />}
      {replyComments.map((item) => (
        <div key={item?._id}>{item?.reply && <ReplyComment onReplySubmitted={handleReplySubmitted} id={item._id} reply={item.reply} name={item.name ?? ''} />}</div>
      ))}
    </div>
  );
};

export default SignedUserComment;
