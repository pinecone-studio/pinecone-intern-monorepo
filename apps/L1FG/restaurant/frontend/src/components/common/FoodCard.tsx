export type FoodCardPropsType = { price: number; title: string; img: string };

const FoodCard = ({ title, price, img }: FoodCardPropsType) => {
  return (
    <div>
      <div
        className="w-40 h-40 bg-cover rounded-md"
        style={{
          backgroundImage: `url(${img})`,
          width: '160px',
          height: '160px',
        }}
      ></div>
      <p className="font-light">{title}</p>
      <p className="font-bold">{price}K</p>
    </div>
  );
};

export default FoodCard;
