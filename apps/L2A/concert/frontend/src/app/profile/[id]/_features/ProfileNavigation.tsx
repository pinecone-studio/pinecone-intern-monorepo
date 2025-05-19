'use client';
import { useState } from 'react';
import ForgetPassword from './ForgetPassword';
import UserProfile from './UserProfile';
import OrderHistory from './OrderHistory';
import Sidebar from './SidebarNavigation';

const UserProfileContainer = ({ orderId }: { orderId: string }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'password'>('profile');

  return (
    <div className="min-h-screen bg-[#111113] text-white flex" data-cy="user-profile-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 p-8" data-cy="profile-main">
        {activeTab === 'profile' && (
          <div data-cy="profile-tab">
            <UserProfile />
          </div>
        )}
        {activeTab === 'orders' && (
          <div className="space-y-6" data-cy="orders-tab">
            <OrderHistory
              status="COMPLETED"
              orderId={orderId}
              date="2024.10.21"
              tickets={[
                { name: 'Арын тасалбар', price: 89000, quantity: 2, color: 'text-white' },
                { name: 'VIP тасалбар', price: 99000, quantity: 8, color: 'text-blue-500' },
              ]}
            />
          </div>
        )}
        {activeTab === 'password' && (
          <div data-testid="password-tab">
            <ForgetPassword />
          </div>
        )}
      </main>
    </div>
  );
};

export default UserProfileContainer;
