import Image from 'next/image';
import Posts from '../svg/Posts';
import Saved from '../svg/Saved';

const items = [
  { image: '/images/profilePic.png' },
  { image: '/images/profilePic.png' },
  { image: '/images/profilePic.png' },
  { image: '/images/profilePic.png' },
  { image: '/images/profilePic.png' },
  { image: '/images/profilePic.png' },
  { image: '/images/profilePic.png' },
  { image: '/images/profilePic.png' },
  { image: '/images/profilePic.png' },
];

const Post = () => {
  return (
    <div className="flex flex-col gap-5  " data-testid="profile-post">
      <div>
        <p className="w-full border"></p>
      </div>

      <div className="flex justify-center gap-4">
        <div className="flex justify-center items-center gap-1 ">
          <Posts />
          <p className="text-xs font-medium tex-[#09090B]">POSTS</p>
        </div>
        <div className="flex justify-center items-center gap-1 ">
          <Saved />
          <p className="text-xs font-medium tex-[#09090B]">SAVED</p>
        </div>
      </div>

      <div>
        <div className="grid grid-cols-3 gap-1 overflow-y-scroll ">
          {items.map((item, index) => (
            <div key={index} className="flex items-center justify-center border p-2">
              <Image src={item.image} alt={'profile'} className="bg-slate-500" width={309} height={309} />
            </div>
          ))}
        </div>
        <div className="text-gray-500 text-wrap text-[12px] flex flex-col gap-4 mt-8 ">
          <p className="flex justify-center">About · Help · Press · API · Jobs · Privacy · Terms · Locations · Language · Meta Verified</p>
          <p className="flex justify-center">© 2024 INSTAGRAM FROM META</p>
        </div>
      </div>
    </div>
  );
};

export default Post;
