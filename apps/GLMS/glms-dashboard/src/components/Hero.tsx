'use client';
import { Book } from '../../public/assets/Book';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const Hero: React.FC = () => {
  const router = useRouter();

  const navigateToIndex = () => {
    router.push('/admin/addCourse');
  };

  return (
    <div className="bg-white border-b">
      <div className="items-center grid grid-cols-2 mx-auto container">
        <div className="flex flex-col gap-[32px]">
          <div>
            <div className="font-medium text-4xl">Сайн уу?</div>
            <div className="font-bold text-4xl">Өдрийн мэнд</div>
          </div>
          <div className="flex gap-2">
            <Button className="flex gap-1 bg-[#000000]" onClick={navigateToIndex}>
              Хичээл <Plus className="h-5" />
            </Button>
            <Button variant="outline">
              Сорил
              <Plus className="h-5" />
            </Button>
          </div>
        </div>
        <div className="flex justify-end items-center px-12 pt-12">
          <Book />
        </div>
      </div>
    </div>
  );
};
