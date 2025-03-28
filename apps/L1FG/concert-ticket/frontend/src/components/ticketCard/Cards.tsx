import { Concert } from '@/generated';
import { Card } from './Card';

export interface CardProps {
  cards: Concert[] | undefined;
}

export const Cards = ({ cards }: CardProps) => {
  return (
    <div className="grid grid-cols-3 place-items-center gap-12 mx-auto my-10 cursor-pointer">
      {cards?.slice(0, 9).map((card, index) => {
        return <Card card={card} key={index}></Card>;
      })}
    </div>
  );
};
