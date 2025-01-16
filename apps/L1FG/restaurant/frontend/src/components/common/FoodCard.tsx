const FoodCard = (props: { title: string; price: number; img: string }) => {
  const { title, price, img } = props;
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
