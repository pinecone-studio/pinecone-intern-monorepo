'use client';
import ArticleCard from '../_components/ArticleCard';
import { useState } from 'react';

type GroupArticlesProps = {
  title: string;
  categoryId: string;
};

const GroupArticles = (props: GroupArticlesProps) => {
  const { title, categoryId } = props;
  const [quantity, setQuantity] = useState(2);
  const clickHandler = () => setQuantity((prev) => prev + 2);

  const mockArticles = [
    {
      title: 'test',
      coverPhoto:
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ff5db77d-8078-4e30-b33b-1af4bd776e89/decomno-187d4a21-f2d1-4b57-ae66-8040cd23b01e.png/v1/fit/w_828,h_466,q_70,strp/speedpainting___random_landscape_by_waltjan_decomno-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvZmY1ZGI3N2QtODA3OC00ZTMwLWIzM2ItMWFmNGJkNzc2ZTg5XC9kZWNvbW5vLTE4N2Q0YTIxLWYyZDEtNGI1Ny1hZTY2LTgwNDBjZDIzYjAxZS5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.vZKoyTD7urPQBHiteKm6nZ40PpDf5LMYrnvLiNg8J8U',
      publishedAt: '20wh',
      content: 'lawuiefhasf',
      category: 'coding',
      id: '123',
    },
    {
        title: 'tedddst',
        coverPhoto:
          'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ff5db77d-8078-4e30-b33b-1af4bd776e89/decomno-187d4a21-f2d1-4b57-ae66-8040cd23b01e.png/v1/fit/w_828,h_466,q_70,strp/speedpainting___random_landscape_by_waltjan_decomno-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvZmY1ZGI3N2QtODA3OC00ZTMwLWIzM2ItMWFmNGJkNzc2ZTg5XC9kZWNvbW5vLTE4N2Q0YTIxLWYyZDEtNGI1Ny1hZTY2LTgwNDBjZDIzYjAxZS5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.vZKoyTD7urPQBHiteKm6nZ40PpDf5LMYrnvLiNg8J8U',
        publishedAt: '20wh',
        content: 'lawuiefhasf',
        category: 'coding',
        id: '12ddd3',
      },
      {
        title: 'tessaast',
        coverPhoto:
          'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ff5db77d-8078-4e30-b33b-1af4bd776e89/decomno-187d4a21-f2d1-4b57-ae66-8040cd23b01e.png/v1/fit/w_828,h_466,q_70,strp/speedpainting___random_landscape_by_waltjan_decomno-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvZmY1ZGI3N2QtODA3OC00ZTMwLWIzM2ItMWFmNGJkNzc2ZTg5XC9kZWNvbW5vLTE4N2Q0YTIxLWYyZDEtNGI1Ny1hZTY2LTgwNDBjZDIzYjAxZS5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.vZKoyTD7urPQBHiteKm6nZ40PpDf5LMYrnvLiNg8J8U',
        publishedAt: '20wh',
        content: 'lawuiefhasf',
        category: 'coding',
        id: '12dddddddddd3',
      },
  ];

  return (
    <div data-cy="article-main-container" className="flex flex-col w-full md:p-6 sm:p-2 gap-8 bg-[#fff] rounded-2xl ">
      <div data-cy="group-container" className="flex flex-col p-6 gap-8 bg-[#fff] rounded-2xl">
        <p data-cy="group-title" className="text-[28px] font-bold text-black">
          {title}
        </p>
        <div data-cy="group-grid" className="grid md:grid-cols-2 md:gap-8 sm:grid-cols-1">
          {mockArticles.map((item) => (
            <ArticleCard key={item.id} title={item?.title} cover={item.coverPhoto} description={item?.content} category={item?.category} date={item?.publishedAt} />
          ))}
        </div>
        <div data-cy="group-innerCon" className="flex w-full justify-center">
          <div data-cy="group-icon-button" onClick={clickHandler} className="w-fit h-fit flex cursor-pointer p-4 rounded-full hover:bg-[#1C202414]">
            {/* <DropDownIcon /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupArticles;
