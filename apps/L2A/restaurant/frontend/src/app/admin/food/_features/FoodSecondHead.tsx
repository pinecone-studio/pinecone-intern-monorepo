'use client';
import { Toaster } from 'sonner';
import FoodForm from './FoodForm';

const FoodSecHead = () => {
  return (
    <div className="flex justify-between p-4 max-w-4xl mx-auto" data-testid="food-section-header">
      <Toaster position="top-center" expand={true} data-testid="food-toaster" />
      <h1 className="text-2xl font-bold" data-testid="food-header-title">
        Хоол
      </h1>
      <div data-testid="food-form-wrapper">
        <FoodForm />
      </div>
    </div>
  );
};
export default FoodSecHead;
