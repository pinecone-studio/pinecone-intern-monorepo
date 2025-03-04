'use client';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Match } from '@/generated';
import { useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type MatchesProps = {
  matches: Match[];
  handleCloseModal: any;
};

export const ProfileCarouselUser: React.FC<MatchesProps> = ({ matches, handleCloseModal }) => {
  const searchParams = useSearchParams();
  const username = searchParams.get('username');

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = (length: number) => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % length);
  };

  const handlePrevious = (length: number) => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + length) % length);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="w-[350px] h-[550px] flex flex-col mt-[80px] justify-between items-center">
        <Carousel className="w-full mt-8 max-w-[350px]">
          <CarouselContent>
            {matches
              .filter((el) => el.targetUserId?.username === username || el.userId?.username === username)
              .map((el, index) => {
                // Determine which user's details to show
                const userDetails = el.targetUserId?.username === username ? el.targetUserId : el.userId;

                return (
                  <CarouselItem key={index}>
                    <Card className="overflow-hidden">
                      <CardContent className="p-0">
                        <div className="relative">
                          <div className="relative w-[350px] h-[450px]">
                            <img src={userDetails?.images[activeIndex]} alt={`${userDetails?.username}-${activeIndex}`} className="w-full h-full object-cover" />
                            <button className="absolute top-4 bg-black px-2 text-white right-8" onClick={handleCloseModal}>
                              x
                            </button>
                            <div className="absolute top-[200px] left-0 right-0 flex justify-between px-4">
                              <button
                                data-testid="prev"
                                onClick={() => userDetails?.images.length && handlePrevious(userDetails.images.length)}
                                className="w-10 h-10 rounded-md border flex justify-center items-center bg-white"
                              >
                                <ChevronLeft />
                              </button>

                              <button
                                data-testid="next"
                                onClick={() => userDetails?.images.length && handleNext(userDetails.images.length)}
                                className="w-10 h-10 flex justify-center items-center rounded-md border bg-white"
                              >
                                <ChevronRight />
                              </button>
                            </div>
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
                            <div className="flex items-center gap-2">
                              <h2 className="text-[18px] font-semibold">{userDetails?.username},</h2>
                              <p className="text-[18px] font-semibold">{userDetails?.age}</p>
                            </div>
                            <p className="text-sm">{userDetails?.profession}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
          </CarouselContent>
        </Carousel>
      </div>
    </div>
  );
};
