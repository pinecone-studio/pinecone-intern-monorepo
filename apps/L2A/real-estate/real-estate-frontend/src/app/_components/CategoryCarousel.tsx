'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import CategoryCard from './CategoryCard';

const categories = [
  {
    title: 'Шинээр нэмэгдсэн',
    count: 1209,
    imageUrl: '/listingcard.png',
  },
  {
    title: 'Хотын төвтэй ойрхон',
    count: 850,
    imageUrl: '/listingcard.png',
  },
  {
    title: 'Агаар сайтай бүс',
    count: 670,
    imageUrl: '/listingcard.png',
  },
  {
    title: 'А зэргийн бүс',
    count: 540,
    imageUrl: '/listingcard.png',
  },
  {
    title: 'Тансаг зэрэглэл',
    count: 300,
    imageUrl: '/listingcard.png',
  },
];

const CategoryCarousel = () => {
  return (
    <section className="py-10">
      <div data-cy="category-carousel" className="max-w-6xl mx-auto px-4">
        <Swiper
          spaceBetween={20}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
        >
          {categories.map((category, index) => (
            <SwiperSlide key={index}>
              <CategoryCard {...category} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CategoryCarousel;
