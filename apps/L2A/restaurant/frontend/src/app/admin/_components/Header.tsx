'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
const AdminHeader = () => {
  const menuItems = ["Захиалга", "Төсөв", "Хоол", "Ширээ"];
  const renderNavItem = (item: string, index: number) => (
    <p
      key={index}
      className={`
        text-lg cursor-pointer px-2 py-1 rounded transition-colors
        hover:bg-gray-100
      `}
    >
      {item}
    </p>
  );
  return (
    <header className="w-full shadow-sm">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
        </div>
        <nav className="flex gap-6 text-sm font-medium">
          {menuItems.map(renderNavItem)}
        </nav>
        <div>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};
export default AdminHeader;
