import { Dispatch, SetStateAction } from 'react';

const Sidebar = ({ setActiveTab, activeTab }: { setActiveTab: Dispatch<SetStateAction<'profile' | 'orders' | 'password'>>; activeTab: 'profile' | 'orders' | 'password' }) => {
  return (
    <aside className="w-64 bg-[#1c1c1e] p-4 space-y-4">
      <button
        data-cy="user-profile"
        onClick={() => setActiveTab('profile')}
        className={`w-full text-left font-medium px-4 py-2 rounded ${activeTab === 'profile' ? 'bg-[#2c2c2e]' : 'hover:underline'}`}
      >
        Хэрэглэгчийн мэдээлэл
      </button>
      <button data-cy="order-history" onClick={() => setActiveTab('orders')} className={`w-full text-left px-4 py-2 rounded ${activeTab === 'orders' ? 'bg-[#2c2c2e]' : 'hover:underline'}`}>
        Захиалгын түүх
      </button>
      <button data-cy="forget-password" onClick={() => setActiveTab('password')} className={`w-full text-left px-4 py-2 rounded ${activeTab === 'password' ? 'bg-[#2c2c2e]' : 'hover:underline'}`}>
        Нууц үг сэргээх
      </button>
    </aside>
  );
};
export default Sidebar;
