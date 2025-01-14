import { Card } from './Card';

type DataProps = {
  src: string;
  title: string;
  artist: string;
  price: string;
  concertDay: string;
  discount: string;
};
type CardProps = {
  cards: DataProps[];
};
export const Cards = ({ cards }: CardProps) => {
  return (
    <div className="grid grid-cols-3 gap-8">
      {cards?.map((card, index) => {
        return <Card card={card} key={index}></Card>;
      })}
    </div>
  );
};
