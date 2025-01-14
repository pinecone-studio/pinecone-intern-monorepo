import Image from 'next/image';
import { HeartSVG } from '../leftSideBar/Svg/HeartSvg';
import { CommentSVG } from '../leftSideBar/Svg/CommentSvg';
import { BookmarkSVG } from '../leftSideBar/Svg/BookmarkSvg';

const MainPagePost = () => {
  return (
    <div className="md:border-b-[1px] md:pb-5">
      <div className="w-[468px] h-[585px] rounded-full overflow-hidden relative">
        <Image src="/images/profilePic.png" alt="zurag orno" fill className="object-cover" />
      </div>

      <div className="flex items-center justify-between px-1 py-3 text-xl">
        <div className="flex gap-3">
          <HeartSVG />
          <CommentSVG />
        </div>
        <BookmarkSVG />
      </div>

      <div>
        <h1 className="text-base font-normal text-gray-600">
          <span className="pr-1 font-bold text-black">Username</span>
          description
        </h1>
      </div>
      <p>view 1 comment</p>
      <p>create comment</p>
    </div>
  );
};

export default MainPagePost;
