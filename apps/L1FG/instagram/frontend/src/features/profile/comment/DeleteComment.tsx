import { GetCommentsDocument, useDeleteCommentMutation } from '@/generated';
import { Ellipsis } from 'lucide-react';
import { Dialog, DialogClose, DialogContent,  DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/components/providers/AuthProvider';

const DeleteComment = ({ commentId }: { commentId: string }) => {
  const { user } = useAuth();
  const userId = user?._id;
  const [deleteComment] = useDeleteCommentMutation({
    refetchQueries: [
      {
        query: GetCommentsDocument,
        variables: {
          input: {
            postId: userId,
            after: '',
            first: 6,
          },
        },
      },
    ],
  });

  const handleDelete = async () => {
    try {
      await deleteComment({
        variables: { commentId },
        update: (cache) => {
          cache.evict({ id: commentId });
          cache.gc();
        },
      });
    } catch (err) {
      console.error('Error deleting post:', err);
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
          <p className="flex items-center justify-center py-3  cursor-pointer hover:bg-[#EFEFEF]">Cancel</p>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteComment;
