/* eslint-disable max-lines */
/* eslint-disable complexity */
'use client';
import { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useGetAllUsersQuery, useUpdateMatchMutation } from '@/generated';
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
  match: string[];
};

export const SwipeCards = () => {
  const { data } = useGetAllUsersQuery();
  const [loading, setLoading] = useState(true);
  const [cards, setCards] = useState<User[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMatchOpen, setIsMatchOpen] = useState(false);
  const [matchDetails, setMatchDetails] = useState({
    userImage: '',
    matchImage: '',
    matchName: '',
  });
  const [updateMatch] = useUpdateMatchMutation();

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}'); // Get the current user's data from localStorage

  const userImage = currentUser.images ? currentUser.images[0] : ''; // User's image
  const currentCard = cards[currentIndex]; // The user being swiped on

  useEffect(() => {
    if (data && data.getAllUsers) {
      // Filter out the current user from the list of users
      const filteredCards = data.getAllUsers.filter((user: User) => user._id !== currentUser._id);
      setCards(filteredCards);
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

  const handleSwipe = async (direction: 'left' | 'right') => {
    const currentUserId = currentUser._id;
    const currentMatchId = cards[currentIndex]._id; // The _id of the user being swiped on

    if (!currentUserId) {
      throw new Error('No authenticated user found');
    }

    const matchUser = cards[currentIndex]; // The matched user
    const userImage = currentUser.image || ''; // Get the logged-in user's image
    const matchImage = matchUser.images[0]; // Get the matched user's image
    const matchName = matchUser.username; // The name of the matched user

    console.log(`Swipe direction: ${direction}, currentUserId: ${currentUserId}, currentMatchId: ${currentMatchId}`);

    if (direction === 'right') {
      try {
        // Update the match with the current user and the user being swiped on
        const result = await updateMatch({
          variables: { userId: currentUserId, matchId: currentMatchId },
        });
        console.log('Match updated:', result);

        // If a match is made, open the modal
        setIsMatchOpen(true); // Open the match modal with the match details
        setMatchDetails({ userImage, matchImage, matchName }); // Store the match details for the modal
      } catch (error: any) {
        if (error.message === 'Match ID already exists for this user') {
          console.log('Match already exists for this user');
          setIsMatchOpen(true); // Open the match modal with the match details
          setMatchDetails({ userImage, matchImage, matchName }); // Store the match details for the modal
        } else {
          console.error('Error updating match:', error);
        }
      }
    }

    // After showing the match modal, move to the next card
    setCurrentIndex((prevIndex) => prevIndex + 1); // Move to the next card
  };

  if (!currentCard) {
    return (
      <div>
        <UnMatch />
      </div>
    );
  }

  return (
    <div className="mt-[150px] md:mt-4 h-screen w-screen place-items-center">
      <SwipeCard key={currentCard._id} user={currentCard} onSwipe={handleSwipe} />
      <UserMatchComp
        isOpen={isMatchOpen}
        onClose={() => {
          setIsMatchOpen(false);
          setCurrentIndex((prevIndex) => prevIndex + 1); // Move to the next card when closing the modal
        }}
        userImage={userImage}
        matchImage={matchDetails.matchImage}
        matchName={matchDetails.matchName}
      />
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
    <div className="flex justify-center items-center w-screen md:h-screen bg-white">
      <motion.div className="relative bg-white p-4" style={{ x, rotate, opacity }} drag="x" dragConstraints={{ left: 0, right: 0 }} onDragEnd={handleDragEnd}>
        <Carousel className="md:h-[660px] h-[400px] w-[282px] md:w-[440px]" ref={emblaRef}>
          <CarouselContent>
            {user.images.map((image, index) => (
              <CarouselItem key={index}>
                <Card className="overflow-hidden h-[400px] w-[282px] md:h-[660px] md:w-[440px]">
                  <CardContent className="p-0 h-full">
                    <div className="relative h-full">
                      <Image width={440} height={660} src={image} alt={user.username} className="w-[440px] h-[660px] object-cover" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
                        <div className="flex items-center gap-2">
                          <h2 className="text-[18px] font-semibold">{user.username}</h2>
                          <p className="text-[18px] font-semibold">{user.age}</p>
                        </div>
                        <p className="text-sm">{user.profession}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2" />
        </Carousel>
      </motion.div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4">
        <Button size="icon" variant="outline" className="rounded-full w-16 h-16 shadow-md" onClick={() => onSwipe('left')}>
          <X className="h-8 w-8 text-red-500" />
        </Button>
        <Button size="icon" variant="outline" className="rounded-full w-16 h-16 shadow-md" onClick={() => onSwipe('right')}>
          <Check className="h-8 w-8 text-green-500" />
        </Button>
      </div>
    </div>
  );
};
