import { GetPostsDocument, useDeletePostMutation } from '@/generated';
import { Ellipsis } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/components/providers/AuthProvider';
import { toast } from 'react-toastify';

const DeletePost = ({ postId, setPostOpen }: { postId: string; setPostOpen: (_postOPen: boolean) => void }) => {
  const { user } = useAuth();
  const userId = user?._id;
  const [deletePostMutation] = useDeletePostMutation({
    refetchQueries: [
      {
        query: GetPostsDocument,
        variables: {
          input: {
            searchingUserId: userId,
            after: '',
            first: 6,
          },
        },
      },
    ],
  });

  const handleDelete = async () => {
    setPostOpen(false);
    try {
      await deletePostMutation({
        variables: { postId },
        update: (cache) => {
          cache.evict({ id: postId });
          cache.gc();
        },
      });

      toast.success('Post deleted', {
        position: 'bottom-center', // Display at the bottom center
        autoClose: 3000, // Hide after 3 seconds
        hideProgressBar: true, // No progress bar like Instagram
        closeOnClick: true, // Close on click
        pauseOnHover: false, // Don't pause on hover
        draggable: false, // Non-draggable
        theme: 'dark', // Dark theme for Instagram look
        style: {
          borderRadius: '8px',
          background: '#262626',
          color: 'white',
          padding: '12px',
          fontSize: '14px',
          width: '1400px',
        },
      });
    } catch (err) {
      console.error('Error deleting post:', err);
      toast.error('Failed to delete post', {
        position: 'bottom-center',
        autoClose: 3000,
        hideProgressBar: true,
        theme: 'dark',
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Ellipsis />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0 ">
        <div className="flex flex-col ">
          <div className="flex flex-col  pb-7">
            <p className="flex items-center justify-center text-2xl font-mediumf pt-7">Delete post?</p>
            <div className="flex flex-col ">
              <p className="flex items-center justify-center px-14 text-gray-500">Are you sure you want to delete this post?</p>
            </div>
          </div>

          <p className="w-full border-b" />
          <DialogClose>
            <p className="flex items-center justify-center text-red-600 cursor-pointer py-3 hover:bg-[#EFEFEF]" onClick={handleDelete}>
              Delete
            </p>
          </DialogClose>
          <p className="w-full border-b" />
          <DialogClose asChild>
            <p className="flex items-center justify-center py-3  cursor-pointer hover:bg-[#EFEFEF]">Cancel</p>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePost;
