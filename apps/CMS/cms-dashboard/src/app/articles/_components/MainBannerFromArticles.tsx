'use client';

type MainBannerFromArticlesProps = {
  date?: string;
  categories?: string;
  articlesTitle?: string;
  cover?: string;
};
const MainBannerFromArticles = (props: MainBannerFromArticlesProps) => {
  const { date, categories, articlesTitle, cover } = props;

  return (
    <div data-cy="mainBannerComp" className="flex flex-col w-full h-[756px] relative ">
      <div className="w-full h-full flex">
        <img className="w-full h-full object-cover" data-cy="main-cover" src={cover} alt="article-cover" />
      </div>
      <div data-cy="innerComp" className="flex flex-col absolute bottom-0 w-full  justify-center items-center gap-6 p-6 pb-[50px] bg-gradient-to-t from-black to-transparent">
        <div className="flex flex-row gap-2 items-center">
          <p data-cy="main-date" className="font-bold text-[15px] text-white">
            {date?.slice(0, -14)}
          </p>
          <div className="w-1 h-1 rounded-full bg-white"></div>

          <p data-cy="main-categories" className="text-white">
            #{categories}
          </p>
        </div>
        <p data-cy="articlesTitle" className="font-bold text-[32px] max-w-[850px] text-center text-white">
          {articlesTitle}
        </p>
        <div data-cy="mainBtn" className=" rounded-full bg-white text-black p-[12px 16px] px-4 py-3 hover:text-white hover:bg-inherit cursor-pointer">
          Унших
        </div>
      </div>
    </div>
  );
};
export default MainBannerFromArticles;
