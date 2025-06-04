'use client';
import { useAuth } from '@/app/_components/context/AuthContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const AdminHeader = () => {
  const pathname = usePathname();
  const isTicketPage = pathname === '/admin/concerts';
  const isCancelRequestPage = pathname === '/admin/cancel-request';
  const isAdmin = pathname.startsWith('/admin/');
  const { user, logout } = useAuth();

  return (
    <header className="pt-4 px-6 bg-background">
      <div className="flex justify-between pl-2 ">
        <div className="flex items-center gap-1">
          <div className="w-5 h-5 bg-[#00B7F4] rounded-full"></div>
          <h1 className="text-2xl font-semibold">TICKET BOOKING</h1>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="bg-gray-400 rounded-lg p-2 text-white text-sm border-2 border-stone-300">{user?.email}</div>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div onClick={logout}>Log out</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {isAdmin && (
        <div className="flex text-sm font-medium">
          <Link data-testid="ticket-button-admin" href={'/admin/concerts'} className={`p-[6px]` + (isTicketPage ? ' border-b border-black' : '')}>
            <div className="p-[6px]">Концертууд</div>
          </Link>
          <Link data-testid="cancel-request-admin" href={'/admin/cancel-request'} className={`p-[6px]` + (isCancelRequestPage ? ' border-b border-black' : '')}>
            <div className="p-[6px]">Цуцлах хүсэлт</div>
          </Link>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;
