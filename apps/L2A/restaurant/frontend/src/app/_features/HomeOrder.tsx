'use client';   
import CartItem from '@/app/_components/CartItems';

const product = {
  image: '/images/taco.jpg',
  name: 'Taco Taco',
  price: '15.6k',
};

const HomeOrder = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-[#F5F5F5]">
        <div className="w-full bg-white rounded-t-2xl p-4 shadow-lg ">
          <div className="text-2xl font-bold mb-4 text-[#441500] flex justify-center">Таны захиалга</div>
          <CartItem item={product} />
        </div>
     </div>
  );
};

export default HomeOrder;