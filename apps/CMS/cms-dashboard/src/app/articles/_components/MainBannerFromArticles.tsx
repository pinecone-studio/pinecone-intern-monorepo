'use client';

import { useRouter } from 'next/navigation';
import { AiOutlineUser } from 'react-icons/ai';
import Modal from './Modal';
import { useState } from 'react';

type MainBannerFromArticlesProps = {
  date?: string;
  categories?: string;
  articlesTitle?: string;
  cover?: string;
  id?: string;
};
const MainBannerFromArticles = (props: MainBannerFromArticlesProps) => {
  const [isShown, setIsShown] = useState(false);
  const handleModalClose = () => {
    setIsShown(false);
  };
  const { date, categories, articlesTitle, cover, id } = props;
  const router = useRouter();

  const routerHandler = () => {
    router.push(`articles/${id}`);
  };

  const jumper = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsShown(true);
    } else {
      router.push('/sign-in');
    }
  };
  return (
    <div data-cy="mainBannerComp" className="flex flex-col w-full xl:h-[756px] lg:h-[656px] md:h-[556px] sm:h-[456px] relative">
      <div className="w-full h-full flex">
        <img className="w-full h-full object-cover" data-cy="main-cover" data-testid="mainCover" src={cover} alt="article-cover" />
      </div>
      <div className="w-full fixed top-0 bg-white p-5 h-[48px] z-10 p-4 box-shadow: rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;">
        <img data-testid="imgButton" width={36} height={34} className="absolute top-2 left-[20%] b-6" src="Logo.svg" />
        <AiOutlineUser data-testid="jumper" color="#000" style={{ position: 'absolute', right: '20%', width: 36, height: 36, bottom: 6 }} onClick={jumper} />
      </div>
      <div data-cy="innerComp" className="flex flex-col absolute bottom-0 w-full  justify-center items-center gap-6 p-6 pb-[50px] bg-gradient-to-t from-black to-transparent">
        <div className="flex flex-row gap-2 items-center">
          <p data-cy="main-date" data-testid="mainDate" className="font-bold text-[15px] text-white">
            {date?.slice(0, -14)}
          </p>
          <div className="w-1 h-1 rounded-full bg-white"></div>

          <p data-cy="main-categories" data-testid="mainCategory" className="text-white">
            #{categories}
          </p>
        </div>
        <p data-cy="articlesTitle" data-testid="mainTitle" className="font-bold text-[32px] max-w-[850px] text-center text-white">
          {articlesTitle}
        </p>
        <button data-testid="mainBtn" onClick={routerHandler} data-cy="mainBtn" className=" rounded-full bg-white text-black p-[12px 16px] px-4 py-3 hover:text-white hover:bg-inherit cursor-pointer">
          Унших
        </button>
        <Modal data-testid="modal" isVisible={isShown} onClose={handleModalClose} />
      </div>
    </div>
  );
};
export default MainBannerFromArticles;
