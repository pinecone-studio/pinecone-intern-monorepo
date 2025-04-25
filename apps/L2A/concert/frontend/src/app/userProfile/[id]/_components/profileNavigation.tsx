'use client';
import { useState } from 'react';
import ForgetPassword from './ForgetPassword';
import UserProfile from './UserProfile';
import OrderHistory from './OrderHistory';
import Navigation2 from './ProfileNavigation2';

const UserProfileContainer = ({ orderId }: { orderId: string }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'password'>('profile');

  return (
    <div className="min-h-screen bg-[#111113] text-white flex">
      <Navigation2 activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="flex-1 p-8">
        {activeTab === 'profile' && <UserProfile />}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <OrderHistory
              orderId={orderId}
              date="2024.10.21"
              tickets={[
                { name: 'Арын тасалбар', price: 89000, quantity: 2, color: 'text-white' },
                { name: 'VIP тасалбар', price: 99000, quantity: 8, color: 'text-blue-500' },
              ]}
            />
          </div>
        )}
        {activeTab === 'password' && <ForgetPassword />}
      </main>
    </div>
  );
};
export default UserProfileContainer;
