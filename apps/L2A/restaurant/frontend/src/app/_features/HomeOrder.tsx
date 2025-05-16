'use client';
import { useState } from 'react';
import CartItem from '@/app/_components/CartItems';

const product = {
  image: '/images/taco.jpg',
  name: 'Taco Taco',
  price: '15.6k',
};

const HomeOrder = () => {
  const [step, setStep] = useState(1);

  const handleOrderClick = () => {
    setStep(2);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-[#F5F5F5] ">
      <div className="w-full bg-white rounded-t-2xl p-4 shadow-lg flex flex-col items-center">
        {step === 1 ? (
          <>
            <div className="text-2xl font-bold mb-4 text-[#441500] flex justify-center">
              Таны захиалга
            </div>
            <CartItem item={product} data-testid="cart-item" />
            <div className="flex w-full justify-center items-center mt-12">
              <button
                className="text-[#FAFAFA] bg-[#441500] w-full h-[36px] rounded-md font-medium text-[14px]"
                data-testid="order-button"
                onClick={handleOrderClick}
              >
                Захиалах
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col justify-center items-center h-full">
            <p className="text-xl text-gray-600">Next step content goes here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeOrder;
