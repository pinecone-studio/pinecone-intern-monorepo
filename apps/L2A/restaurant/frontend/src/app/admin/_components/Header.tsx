'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';

const AdminHeader = () => {
  const menuItems = [
    { name: 'Orders', link: '/admin/orders' },
    { name: 'Menu', link: '/admin/menu' },
    { name: 'Food', link: '/admin/food' },
    { name: 'Table', link: '/admin/table' },
  ];
  return (
    <header className="w-full shadow-sm" data-testid="admin-header">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <nav className="flex gap-6 text-sm font-medium mx-auto" data-testid="nav-bar">
          {menuItems.map((item) => (
            <Link href={item.link} key={item.name} data-testid={`nav-item-${item.name}`}>
              <p data-testid={'Food'} className="text-lg cursor-pointer px-2 py-1 rounded hover:bg-gray-100">
                {item.name}
              </p>
            </Link>
          ))}
        </nav>
        <div data-testid="avatar-container" className="absolute top-4 right-8">
          <Avatar data-testid="avatar">
            <AvatarImage src="https://github.com/shadcn.png" data-testid="avatar-image" />
            <AvatarFallback data-testid="avatar-fallback">CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};
export default AdminHeader;
