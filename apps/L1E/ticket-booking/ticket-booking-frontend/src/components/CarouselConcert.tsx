'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const images = [
  'https://as2.ftcdn.net/v2/jpg/10/62/03/07/1000_F_1062030789_yaKuxV8QuIRqIgAfTA0wYlc797DinmdH.jpg',
  'https://media.istockphoto.com/id/1154370446/photo/funny-raccoon-in-green-sunglasses-showing-a-rock-gesture-isolated-on-white-background.jpg?s=1024x1024&w=is&k=20&c=pDRbcAdAzUMJ6c1BL3y-jfnJ9uvlDHTFSkJ6_LpZSzU=',
  'https://as1.ftcdn.net/jpg/03/73/16/86/1000_F_373168623_jTLasKYUB5Li0g5dI6uemZywfICeiZTI.webp',
];

export const CarouselConcert = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-[550px] relative overflow-hidden">
      {/* Зурагнууд */}
      {images.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={`Slide ${index + 1}`}
          width={100}
          height={100}
          className={`absolute top-0 left-0 w-full h-full object-cover object-center transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        />
      ))}

      {/* ⬅ Зүүн сум */}
      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-6 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all duration-300 z-20"
        aria-label="Previous Slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* ➡ Баруун сум */}
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-6 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full transition-all duration-300 z-20"
        aria-label="Next Slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="white" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* ● Доод талын навигац цэгүүд */}
      <div className="absolute bottom-6 w-full flex justify-center gap-3 z-20">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-white scale-110' : 'bg-white/30'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
