'use client';

import { AdminHeader } from '@/components/AdminHeader';
import { TicketTab } from '@/components/TicketTab';
import { useState } from 'react';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState<'ticket' | 'cancelRequest'>('ticket');
  return (
    <div className="text-black bg-[#F4F4F5] w-full min-h-screen">
      <AdminHeader activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex [&>*]:text-sm [&>*]:font-medium [&>*]:py-2 [&>*]:px-3 w-full bg-white px-6">
        {/* Tabs are now in AdminHeader */}
      </div>

      <TicketTab activeTab={activeTab} />
    </div>
  );
};

export default AdminPage;
