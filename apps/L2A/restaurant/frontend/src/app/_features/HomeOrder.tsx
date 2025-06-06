'use client';
import CartItem from '@/app/_components/CartItems';
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const product = {
  image: '/https://montuul.mn/wp-content/uploads/2024/05/fda.jpg',
  name: 'Тактуритан',
  price: '28k',
};

const HomeOrder = () => {
  const [option, setOption] = useState<'dinein' | 'takeaway' | null>(null);
  const router = useRouter();

  const handleRouteChange = (value: 'dinein' | 'takeaway') => {
    setOption(value);
    if (value === 'dinein') router.push('/');
    if (value === 'takeaway') router.push('/');
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="w-full p-4 shadow-lg flex flex-col items-center">
        <div className="text-2xl font-bold mb-4 text-[#441500] flex justify-center">Таны захиалга</div>

        <CartItem item={product} data-testid="cart-item" />

        <div className="flex w-full justify-center bg-black items-center mt-12">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button className="text-[#FAFAFA] bg-[#441500] w-full h-[36px] rounded-md font-medium text-[14px]" data-testid="order-button">
                Захиалах
              </button>
            </AlertDialogTrigger>

            <AlertDialogContent className="rounded-lg w-[350px] h-[140px]">
              <AlertDialogCancel className="absolute top-2 right-4" data-testid="close-dialog">
                <X />
              </AlertDialogCancel>

              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[20px] ml-[30px] font-md">Зааланд суух эсэх</h2>
              </div>

              <div className="flex gap-8 justify-center">
                <Link href={'/payment'}>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="dineOption"
                      value="dinein"
                      onChange={() => handleRouteChange('dinein')}
                      checked={option === 'dinein'}
                      data-testid="radio-dinein"
                      className="w-[20px] h-[20px]"
                    />
                    Эндээ идэх
                  </label>
                </Link>
                <Link href="/payment">
                  {' '}
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="dineOption"
                      value="takeaway"
                      onChange={() => handleRouteChange('takeaway')}
                      checked={option === 'takeaway'}
                      data-testid="radio-takeaway"
                      className="w-[20px] h-[20px]"
                    />
                    Авч явах
                  </label>
                </Link>
              </div>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default HomeOrder;
