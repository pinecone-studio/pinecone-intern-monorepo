'use client';
import { useGetCategoriesQuery } from '@/generated';
import { ExpandIcon, SearchIcon } from '@/icons';
import { useState } from 'react';
import HeaderArticles from './HeaderArticles';
import SearchArticles from './HeaderSearchArticles';

const ArticleHeader = () => {
  const [isCategoryOpen, setCategoryOpen] = useState<boolean>(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const { data } = useGetCategoriesQuery();

  const categoryOpenHandler = () => {
    setCategoryOpen((prev) => !prev);
  };
  const searchValueHandler = (value: string) => {
    setSearchValue(value);
  };

  return (
    <div data-cy="header-container" className="w-full bg-white py-4 flex justify-center  fixed top-0">
      <div className="w-[90%] max-w-[1250px] flex flex-col items-center justify-center gap-6 relative">
        <div className="w-full flex flex-row justify-between items-center">
          <img src="/Logo.svg" width={32} height={32} />
          <div className="flex flex-row gap-8 items-center">
            <div data-cy="category-text" className="flex flex-row gap-4 items-center cursor-pointer" onClick={categoryOpenHandler}>
              <p className="text-base text-[#5E6166]">Ангилал</p>
              <div style={{ rotate: isCategoryOpen ? '0deg' : '180deg', transitionDuration: '0.4s' }}>
                <ExpandIcon />
              </div>
            </div>
            <div className="flex flex-row gap-4 items-center">
              <SearchIcon />
              <input
                data-cy="search-input"
                placeholder="Хайлт"
                className="bg-white"
                value={searchValue}
                onChange={(e) => {
                  searchValueHandler(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <div
          data-cy="category-and-result"
          style={{ display: isCategoryOpen || searchValue ? 'flex' : 'none' }}
          className="w-[100vw] flex flex-col items-center justify-center  gap-4 absolute top-[150%] z-10 bg-white"
        >
          <div className="max-w-[1250px] bg-white w-full flex flex-col gap-6 py-4">
            {searchValue ? (
              <SearchArticles searchValue={searchValue} />
            ) : (
              <>
                <div className="w-full flex flex-row justify-start">
                  <div className="flex flex-row w-fit max-w-[800px] overflow-x-scroll gap-8">
                    {data?.getCategories.map((category) => {
                      const { name, id } = category;
                      return (
                        <p
                          data-cy="each-category"
                          className="text-[#5E6166] w-fit text-[18px] cursor-pointer"
                          key={id}
                          onClick={() => {
                            setSelectedCategoryId(id);
                          }}
                          onDoubleClick={() => {
                            setSelectedCategoryId(null);
                          }}
                        >
                          {name}
                        </p>
                      );
                    })}
                  </div>
                </div>
                <HeaderArticles id={selectedCategoryId} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleHeader;
