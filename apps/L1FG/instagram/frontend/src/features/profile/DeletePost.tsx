import { GetPostsDocument, useDeletePostMutation } from '@/generated';
import { Ellipsis } from 'lucide-react';
import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/components/providers/AuthProvider';

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
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Ellipsis />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-0 ">
        <div className="flex flex-col ">
          <div className="flex flex-col items-center justify-center p-6 ">
            <div
              style={{ backgroundImage: `url(${user?.profileImage || './images/profilePic.png'})`, backgroundPosition: 'center' }}
              className=" bg-cover  w-[80px] h-[80px] object-cover rounded-full "
            ></div>
          </div>
          <div className="flex flex-col  pb-7">
            <p className="flex items-center justify-center text-2xl font-semibold">Remove follower?</p>
            <div className="flex flex-col ">
              <p className="flex items-center justify-center px-14">Instagram won t tell that they were removed </p>
              <p className="flex items-center justify-center px-14">from your followers.</p>
            </div>
          </div>

          <p className="w-full border p-0" />
          <DialogClose>
            <p className="flex items-center justify-center text-red-600 cursor-pointer py-3 hover:bg-[#EFEFEF]" onClick={handleDelete}>
              Remove
            </p>
          </DialogClose>
          <p className="w-full border" />
          <p className="flex items-center justify-center py-3  cursor-pointer hover:bg-[#EFEFEF]">Cancel</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePost;
