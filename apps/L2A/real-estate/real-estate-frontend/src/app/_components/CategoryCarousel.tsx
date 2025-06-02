'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import CategoryCard from './CategoryCard';
import Link from 'next/link';
import { motion } from 'framer-motion';

const categories = [
  {
    title: 'Шинээр нэмэгдсэн',
    imageUrl: '/shine.png',
  },
  {
    title: 'Хотын төвтэй ойрхон',
    imageUrl: '/hotiin-tuv.jpeg',
  },
  {
    title: 'Агаар сайтай бүс',
    imageUrl: '/agar.png',
  },
  {
    title: 'А зэргийн бүс',
    imageUrl: '/a-zereglel.png',
  },
  {
    title: 'Тансаг зэрэглэл',
    imageUrl: '/tansag.png',
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
          <div className=''>
            {categories.map((category, index) => (
              <SwiperSlide key={`carousel-${index}`}>
                <Link href={`/listing`} className='block'>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.6,
                      ease: 'easeOut',
                    }}
                  >
                    <CategoryCard {...category} />
                  </motion.div>
                </Link>
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </section>
  );
};

export default CategoryCarousel;
