import { useGetCommentsQuery } from '@/generated';
import { Heart } from 'lucide-react';
import Image from 'next/image';

const GetComments = ({ postId }: { postId: string }) => {
  const { data } = useGetCommentsQuery({
    variables: { input: { postId } },
  });
  // const [liked, setLiked] = useState(false);
  // const handleLiked = () => {
  //   setLiked((prev) => !prev);
  // };
  return (
    <div className="p-6 flex flex-col gap-6 h-[498px] overflow-y-auto overflow-x-hidden ">
      {data?.getComments?.map((comment, index) => (
        <div className="flex justify-between items-center" key={index}>
          <div className="flex">
            <Image src="/images/profilePic.png" width={35} height={35} alt="User profile" className="rounded-full w-[35px] h-[35px]" />
            <div className="flex flex-col gap-2 ml-3">
              <div className="flex items-center ">
                <p className="font-semibold">{comment.user?.userName}</p>
                <p className="ml-2 text-sm">{comment.comment}</p>
              </div>
              <div className="flex gap-4 text-xs text-gray-500">
                <p>22 h</p>
                {/* <p className={`cursor-pointer ${liked ? '' : 'hidden'}`} onClick={handleLiked}>
                  1 like
                </p> */}
                <p>Reply</p>
              </div>
            </div>
          </div>
          <div>
            <Heart
              className="cursor-pointer transition-transform duration-200 ease-in-out transform hover:scale-110 h-3 w-3"
              // style={{ stroke: liked ? 'red' : 'black', fill: liked ? 'red' : 'white' }}
              // onClick={handleLiked}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default GetComments;
