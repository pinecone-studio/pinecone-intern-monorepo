import { GetCommentsDocument, useDeleteCommentMutation } from '@/generated';
import { Ellipsis } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const DeleteComment = ({ commentId, postId }: { commentId: string; postId: string }) => {
  const [deleteComment] = useDeleteCommentMutation({
    refetchQueries: [
      {
        query: GetCommentsDocument,
        variables: {
          input: {
            postId: postId,
            after: '',
            first: 4,
          },
        },
      },
    ],
  });

  const handleDelete = async () => {
    try {
      await deleteComment({
        variables: { commentId },
      });
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Ellipsis />
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] p-0 gap-0 ">
        <DialogClose>
          <p className="flex items-center justify-center text-red-600 cursor-pointer py-3 hover:bg-[#EFEFEF]" onClick={handleDelete}>
            Delete
          </p>
        </DialogClose>
        <p className="w-full border-b" />
        <DialogClose asChild>
          <p className="flex items-center justify-center py-3 cursor-pointer hover:bg-[#EFEFEF]">Cancel</p>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteComment;
