'use client';

import { useAuth } from '@/app/_components/context/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const AdminHeader = () => {
  const pathname = usePathname();
  const isTicketPage = pathname === '/admin/concerts';
  const isCancelRequestPage = pathname === '/admin/cancel-request';
  const { user, logout } = useAuth();

  return (
    <header className="w-full bg-background border-b border-muted px-6 py-4">
      <div className="flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-5 h-5 bg-[#00B7F4] rounded-full" />
          <h1 className="text-xl font-bold tracking-tight hover:underline">TICKET BOOKING</h1>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="bg-gray-500 text-white rounded-md px-4 py-2 text-sm border border-gray-300 hover:bg-gray-600 transition">{user?.email}</div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout} className="cursor-pointer">
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="mt-4 flex space-x-6 text-sm font-medium border-b border-gray-200">
        <Link href="/admin/concerts" data-testid="ticket-button-admin" className={`pb-2 transition ${isTicketPage ? 'border-b-2 border-black text-black' : 'text-muted-foreground hover:text-black'}`}>
          Концертууд
        </Link>
        <Link
          href="/admin/cancel-request"
          data-testid="cancel-request-admin"
          className={`pb-2 transition ${isCancelRequestPage ? 'border-b-2 border-black text-black' : 'text-muted-foreground hover:text-black'}`}
        >
          Цуцлах хүсэлт
        </Link>
      </div>
    </header>
  );
};

export default AdminHeader;
