'use client';

import { AdminHeader } from '@/components/AdminHeader';
import { TicketTab } from '@/components/TicketTab';
import { useState } from 'react';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState<'ticket' | 'cancelRequest'>('ticket');
  return (
    <div className="text-black bg-[#F4F4F5] w-full min-h-screen">
      <AdminHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      <TicketTab activeTab={activeTab} />
    </div>
  );
};

export default AdminPage;
