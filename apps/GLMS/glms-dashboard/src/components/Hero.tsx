import { Book } from '../../public/assets/Book';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="border-b">
      <div className="container mx-auto grid grid-cols-2 items-center">
        <div className="flex flex-col gap-[32px]">
          <div>
            <div className="font-medium text-4xl">Сайн уу?</div>
            <div className="font-bold text-4xl">Өдрийн мэнд</div>
          </div>
          <div className="flex gap-2">
            <Button className="flex gap-1 bg-[#000000]">
              Хичээл <Plus className="h-5" />
            </Button>
            <Button variant="outline">
              Сорил
              <Plus className="h-5" />
            </Button>
          </div>
        </div>
        <div className="flex justify-end items-center pt-12 px-12">
          <Book />
        </div>
      </div>
    </div>
  );
};
