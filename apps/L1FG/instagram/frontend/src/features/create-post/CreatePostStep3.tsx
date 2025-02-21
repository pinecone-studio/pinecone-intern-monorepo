import { Dialog, DialogClose, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import CaptionInput from './create-post/last-create-post/CaptionInput';
import { GetPostsDocument, useCreatePostMutation } from '@/generated';
import React from 'react';
import { useAuth } from '../../components/providers/AuthProvider';

export const CreatePostStep3 = ({
  images,
  setStep,
  setOpenCreatePostModal,
}: {
  images: string[];
  setStep: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenCreatePostModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [caption, setCaption] = React.useState('');
  const { user } = useAuth();
  const userId = user?._id;
  const handleBack = () => {
    setOpenCreatePostModal(false);
    setStep(false);
  };

  const [createPost, { loading: loadingPost }] = useCreatePostMutation({
    refetchQueries: [
      {
        query: GetPostsDocument,
        variables: {
          input: {
            searchingUserId: userId,
            after: '',
            first: 9,
          },
        },
      },
    ],
  });

  const handleCreatePost = async () => {
    if (loadingPost) return;

    try {
      await createPost({
        variables: {
          input: {
            postImage: images,
            caption,
          },
        },
      });
      setStep(false);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="cursor-pointer text-[#0095F6]">Next</p>
      </DialogTrigger>
      <DialogContent className="xl:max-w-[900px] p-0 gap-0 border-none absolute">
        <div>
          <div className="flex justify-between py-2 px-4">
            <DialogClose onClick={handleBack}>
              <ArrowLeft />
            </DialogClose>

            <p className="text-lg font-medium">Create new post</p>
            <p onClick={handleCreatePost} className={`cursor-pointer ${loadingPost ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {loadingPost ? 'Loading...' : <h1 className=" text-[#0095F6]">Share</h1>}
            </p>
          </div>

          {!loadingPost ? (
            <div className="flex">
              <div className="w-[65%]">
                <Image src={images[0]} alt="Selected image" className="object-cover w-full h-[600px]" data-testid="selected-image" width={800} height={550} />
              </div>
              <div className="w-[35%] ">
                <p className="border-b w-full"></p>
                <div className="flex px-3 pt-3 gap-4">
                  <div
                    style={{ backgroundImage: `url(${user?.profileImage || './images/profilePic.png'})`, backgroundPosition: 'center' }}
                    className=" bg-cover  w-[35px] h-[35px] object-cover rounded-full "
                  ></div>
                  <div>
                    <p className="text-sm font-semibold">{user?.userName}</p>
                    <p className="text-xs font-normal text-[#71717A]">{user?.fullName}</p>
                  </div>
                </div>
                <CaptionInput caption={caption} setCaption={setCaption} />
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center h-[600px]">
              <div className="flex justify-center items-center animate-spin   rounded-full  bg-[linear-gradient(to_top_right,#f9ce34_10%,#ee2a7b_60%)] p-[3px] border-3">
                <p className=" h-20 w-20 rounded-full bg-white" />
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
