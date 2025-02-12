import { CommentDetailType } from '@/generated';
import Image from 'next/image';

export const Comment = ({ comment }: { comment: CommentDetailType }) => {
  return (
    <div className="flex  justify-between items-center">
      <div className="flex  ">
        <Image src="/images/profilePic.png" width={35} height={35} alt="User profile" className="rounded-full w-[35px] h-[35px]" />

        <div className="flex flex-col gap-2">
          <div className="flex justify-center items-center ">
            <p className="font-semibold  ml-5"> {comment.user?.userName}</p>
            <p className="ml-2 text-sm">{comment.comment}</p>
          </div>
          <div className="flex ml-5 gap-4">
            <p className="text-xs text-gray-500">22 h</p>
            <p className="text-xs text-gray-500">Reply</p>
          </div>
        </div>
      </div>

      <div></div>
    </div>
  );
};
