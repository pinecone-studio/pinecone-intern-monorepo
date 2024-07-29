'use client';

import Banner from '../articles/_components/Banner';
import { useGetArticles, useGetCategories } from '../../generated';
import GroupArticles from '../articles/_features/GroupArticle';
import { FooterButtons } from '../dashboard/_features';

const Home = () => {
  // const { data, loading } = useGetArticles();
  // console.log(data, loading);

  //   const { data: categories, loading: categoriesLoading } = useGetCategories();
  // console.log(categories);

  const mockArticles = [
    {
      title: 'Marphosis Хөтөлбөр: Гадны зах зээлд ажиллах сонирхолтой инженерүүдэд',
      coverPhoto:
        'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ff5db77d-8078-4e30-b33b-1af4bd776e89/decomno-187d4a21-f2d1-4b57-ae66-8040cd23b01e.png/v1/fit/w_828,h_466,q_70,strp/speedpainting___random_landscape_by_waltjan_decomno-414w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzIwIiwicGF0aCI6IlwvZlwvZmY1ZGI3N2QtODA3OC00ZTMwLWIzM2ItMWFmNGJkNzc2ZTg5XC9kZWNvbW5vLTE4N2Q0YTIxLWYyZDEtNGI1Ny1hZTY2LTgwNDBjZDIzYjAxZS5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.vZKoyTD7urPQBHiteKm6nZ40PpDf5LMYrnvLiNg8J8U',
      publishedAt:'2024.03.01',
      category: 'coding',
      id: '123',
    },
  ];

  const mockCategories = [{id: '123', name: 'morphosis'}, {id: '1234', name: 'tech'}]

  return (
    <div>
      <div className="flex flex-col w-full gap-12 bg-[#F7F7F8] items-center pb-6" suppressHydrationWarning={true}>
        <Banner
          articlesTitle={mockArticles[0].title}
          cover={mockArticles[0].coverPhoto}
          date={mockArticles[0].publishedAt}
          categories={mockArticles[0].category}
          id={mockArticles[0].id}
        />
        <div className="flex flex-col md:px-24 sm:px-[48px] gap-12 xl:w-[65%] lg:w-[70%] md:w-[85%] sm:w-[100vw] pb-28">
            {mockCategories.map((item) => (
              <GroupArticles key={item.id} title={item.name} categoryId={item.id} />
            ))}
          </div>
        <div className="flex justify-center m-auto">
          <FooterButtons />
        </div>
      </div>
    </div>
  );
};
export default Home;
