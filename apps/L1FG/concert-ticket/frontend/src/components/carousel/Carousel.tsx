'use client';
import React, { FC, useState, useEffect } from 'react';
import Image from 'next/image';

type Slide = {
  id: string;
  title: string;
  subtitle: string;
  dates: string;
  image: string;
};

type CarouselProps = {
  slides: Slide[];
};

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  });
};

const Carousel: FC<CarouselProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const handleNext = () => {

    
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="relative w-[1500px] h-[501px] overflow-hidden bg-black">
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
                <span className="text-xl font-light">{formatDate(slide.dates)}</span>
              </div>
            </div>
          </div>
        ))}

        <button data-testid="left" onClick={handlePrevious} aria-label="Previous Slide" className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors z-20">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.5 10C0.5 4.7533 4.7533 0.5 10 0.5H30C35.2467 0.5 39.5 4.7533 39.5 10V30C39.5 35.2467 35.2467 39.5 30 39.5H10C4.7533 39.5 0.5 35.2467 0.5 30V10Z"
              stroke="white"
              strokeOpacity="0.2"
            />
            <path d="M22 24L18 20L22 16" stroke="#FAFAFA" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <button data-testid="right" onClick={handleNext} aria-label="Next Slide" className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white/70 hover:text-white transition-colors z-20">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0.5 10C0.5 4.7533 4.7533 0.5 10 0.5H30C35.2467 0.5 39.5 4.7533 39.5 10V30C39.5 35.2467 35.2467 39.5 30 39.5H10C4.7533 39.5 0.5 35.2467 0.5 30V10Z"
              stroke="white"
              strokeOpacity="0.2"
            />
            <path d="M18 24L22 20L18 16" stroke="#FAFAFA" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {slides.map((_, index) => (
            <button key={index} onClick={() => setCurrentIndex(index)} className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-white w-8' : 'bg-white/50'}`} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
