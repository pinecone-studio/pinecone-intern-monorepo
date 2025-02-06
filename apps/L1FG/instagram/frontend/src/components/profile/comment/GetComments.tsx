import { useGetCommentsQuery } from '@/generated';
import { Heart } from 'lucide-react';
import Image from 'next/image';

const GetComments = ({ postId }: { postId: string }) => {
  const { data } = useGetCommentsQuery({
    variables: { input: { postId } },
  });
  return (
    <div className="p-6 flex flex-col gap-6 h-[488px] overflow-y-scroll ">
      {data?.getComments?.map((comment, index) => (
        <div className="flex  justify-between items-center" key={index}>
          <div className="flex  ">
            <Image src="/images/profilePic.png" width={35} height={35} alt="User profile" className="rounded-full w-[35px] h-[35px]" />
            <div className="flex flex-col gap-2">
              <div className="flex justify-center items-center ">
                <p className="font-semibold  ml-5"> {comment.user?.userName}</p>
                <p className="ml-2 text-sm" key={index}>
                  {comment.comment}
                </p>
              </div>
              <div className="flex ml-5 gap-4">
                <p className="text-xs text-gray-500">22 h</p>
                <p className="text-xs text-gray-500">Reply</p>
              </div>
            </div>
          </div>

          <div>
            <Heart className="w-3 h-3" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default GetComments;
