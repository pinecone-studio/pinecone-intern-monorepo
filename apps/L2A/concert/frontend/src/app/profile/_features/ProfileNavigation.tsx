'use client';

import { useState } from 'react';
import ForgetPassword from './ForgetPassword';
import UserProfile from './UserProfile';
import OrderHistory from './OrderHistory';
import Sidebar from './SidebarNavigation';

const UserProfileContainer = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'password'>('profile');

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex flex-col md:flex-row" data-cy="user-profile-container">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="flex-1 px-6 py-8 md:p-10" data-cy="profile-main">
        {activeTab === 'profile' && (
          <section data-cy="profile-tab">
            <UserProfile />
          </section>
        )}
        {activeTab === 'orders' && (
          <section className="space-y-6" data-cy="orders-tab">
            <OrderHistory />
          </section>
        )}
        {activeTab === 'password' && (
          <section data-cy="password-tab">
            <ForgetPassword />
          </section>
        )}
      </main>
    </div>
  );
};

export default UserProfileContainer;
