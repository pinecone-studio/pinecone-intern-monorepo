'use client';
import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useGetAllUsersQuery } from '@/generated';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Check, X } from 'lucide-react';
import { UserMatchComp } from '../match/UserMatchComp';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { Loading } from '../main/Loading';
import { UnMatch } from '../match/UnMatch';
export type User = {
  _id: string;
  username: string;
  interest: string;
  age: string;
  email: string;
  images: string[];
  bio: string;
  profession: string;
  job: string;
  hobby?: string | null | undefined;
  match: string;
};
export const SwipeCards = () => {
  const { data } = useGetAllUsersQuery();
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<User[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMatchOpen, setIsMatchOpen] = useState(false);
  useEffect(() => {
    if (data && data.getAllUsers) {
      setCards(data.getAllUsers);
      setLoading(false);
    }
  }, [data]);
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <Loading />
      </div>
    );
  }
  const handleSwipe = (direction: 'left' | 'right') => {
    if (direction === 'left') {
      setIsMatchOpen(false);
    }
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };
  const currentCard = cards[currentIndex];
  if (!currentCard) {
    return (
      <div>
        <UnMatch />
      </div>
    );
  }
  return (
    <div className="grid h-screen w-screen place-items-center bg-neutral-100">
      <SwipeCard key={currentCard._id} user={currentCard} onSwipe={handleSwipe} />
      <UserMatchComp isOpen={isMatchOpen} onClose={() => setIsMatchOpen(false)} userImage={currentCard.images[0]} matchImage={currentCard.images[0]} matchName={currentCard.username} />
    </div>
  );
};
interface SwipeCardProps {
  user: User;
  onSwipe: (_direction: 'left' | 'right') => void;
}
const SwipeCard = ({ user, onSwipe }: SwipeCardProps) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-150, 0, 150], [-18, 0, 18]);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const [emblaRef] = useEmblaCarousel();
  const handleDragEnd = () => {
    if (x.get() < -100) {
      onSwipe('left');
    } else if (x.get() > 100) {
      onSwipe('right');
    }
  };
  return (
    <div className=" flex justify-center items-center w-screen h-screen bg-white">
      <motion.div className="relative  bg-white p-4 " style={{ x, rotate, opacity }} drag="x" dragConstraints={{ left: 0, right: 0 }} onDragEnd={handleDragEnd}>
        <Carousel className="h-[660px] w-[440px]" ref={emblaRef}>
          <CarouselContent>
            {user.images.map((image, index) => (
              <CarouselItem key={index}>
                <Card className="overflow-hidden h-[660px] w-[440px]">
                  <CardContent className="p-0 h-full">
                    <div className="relative h-full">
                      <Image width={440} height={660} src={image} alt={user.username} className="w-[440px] h-[660px] object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
                        <div className="flex items-center gap-2">
                          <h2 className="text-[18px] font-semibold">{user.username}</h2> <p className="text-[18px] font-semibold">{user.age}</p>
                        </div>
                        <p className="text-sm">{user.job}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" /> <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
        </Carousel>
      </motion.div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
        <Button size="icon" variant="outline" className="rounded-full w-16 h-16 shadow-md" onClick={() => onSwipe('right')}>
          <X className="h-8 w-8 text-red-500" />
        </Button>
        <Button size="icon" variant="outline" className="rounded-full w-16 h-16 shadow-md" onClick={() => onSwipe('left')}>
          <Check className="h-8 w-8 text-green-500" />
        </Button>
      </div>
    </div>
  );
};
