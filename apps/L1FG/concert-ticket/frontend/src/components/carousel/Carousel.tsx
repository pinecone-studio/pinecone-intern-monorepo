'use client';
import React, { FC, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Slide = {
  id: number;
  title: string;
  subtitle: string;
  dates: string;
  image: string;
};

type CarouselProps = {
  slides: Slide[];
};

const Carousel: FC<CarouselProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="relative w-screen h-[500px] overflow-hidden bg-black">
        {slides.map((slide, index) => (
          <div key={slide.id} className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
            <div className="relative w-full h-full">
              <Image src={slide.image} alt={slide.title} fill priority={index === currentIndex} className="object-cover" sizes="100vw" />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                <div className="px-4 py-1 mb-6 border border-white/50 rounded-full">
                  <span className="text-sm font-light tracking-wider">{slide.subtitle}</span>
                </div>
                <h1 className="text-6xl font-bold tracking-wider mb-4 text-center px-4">{slide.title}</h1>
                <span className="text-xl font-light">{slide.dates}</span>
              </div>
            </div>
          </div>
        ))}

        <button onClick={handlePrevious} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors z-20" aria-label="Previous slide">
          <ChevronLeft size={40} />
        </button>

        <button onClick={handleNext} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors z-20" aria-label="Next slide">
          <ChevronRight size={40} />
        </button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-white w-8' : 'bg-white/50'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Carousel;
