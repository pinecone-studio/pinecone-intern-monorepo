import { Concert } from '@/generated';
import { Card } from './Card';

export interface CardProps {
  cards: Concert[] | undefined;
}

export const Cards = ({ cards }: CardProps) => {
  return (
    <div className="grid grid-cols-3 gap-8 w-[1334px] mx-auto my-10 cursor-pointer">
      {cards?.map((card, index) => {
        return <Card card={card} key={index}></Card>;
      })}
    </div>
  );
};
