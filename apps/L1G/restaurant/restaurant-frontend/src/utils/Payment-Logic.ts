/* eslint-disable unicorn/filename-case */

import { FoodServeType } from '@/generated';

export type FoodOrderItemInput = { foodId: string; quantity: number };

export type HandleWalletOrderArgs = {
  targetAmount: string;
  totalBeforeWallet: number;
  setWalletDeduction: (_v: number) => void;
  setWalletUsed: (_v: boolean) => void;
  setSelectedPayment: (_v: string) => void;
  setIsWalletDrawerOpen: (_v: boolean) => void;
  setTargetAmount: (_v: string) => void;
};

export const handleWalletOrder = ({ targetAmount, totalBeforeWallet, setWalletDeduction, setWalletUsed, setSelectedPayment, setIsWalletDrawerOpen, setTargetAmount }: HandleWalletOrderArgs): void => {
  const amt = Math.max(0, Math.min(Number.parseInt(targetAmount) || 0, totalBeforeWallet));
  setWalletDeduction(amt);
  setWalletUsed(true);
  setSelectedPayment('');
  setIsWalletDrawerOpen(false);
  setTargetAmount('');
};

export type HandlePaymentSelectArgs = {
  methodId: string;
  setSelectedPayment: (_v: string) => void;
  setIsWalletDrawerOpen: (_v: boolean) => void;
  createOrder: (_args: {
    variables: {
      input: {
        user: string;
        table: string;
        totalPrice: number;
        FoodOrderItem: FoodOrderItemInput[];
        orderType: FoodServeType;
      };
    };
  }) => Promise<unknown>;
  userId: string;
  table: string;
  finalAmount: number;
  orderFood: FoodOrderItemInput[];
  orderType?: FoodServeType;
  navigate?: (_path: string) => void;
};

export const handlePaymentSelect = async ({
  methodId,
  setSelectedPayment,
  setIsWalletDrawerOpen,
  createOrder,
  userId,
  table,
  finalAmount,
  orderFood,
  orderType,
  navigate,
}: HandlePaymentSelectArgs): Promise<void> => {
  setSelectedPayment(methodId);

  if (methodId === 'wallet') {
    setIsWalletDrawerOpen(true);
    return;
  }

  await createOrder({
    variables: {
      input: {
        user: userId,
        table,
        totalPrice: Number(finalAmount),
        FoodOrderItem: orderFood,
        orderType: orderType as FoodServeType,
      },
    },
  });

  if (navigate) navigate('/PaymentSuccess');
};
