'use client';
import { usePathname, useRouter } from 'next/navigation';
import { ContentPaste, Report, Tag, Window } from './SVG';

export const sidebarItems = [
  { text: 'Нүүр хуудас', icon: <Window />, pathName: '/' },
  { text: 'Ажилчид', icon: <ContentPaste />, pathName: '/employee-details?employees=1' },
  { text: 'Чөлөө', icon: <Report />, pathName: '/leaving' },
  { text: 'Ажлын зар', icon: <Tag />, pathName: '/recruiting' },
];

export const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <aside data-cy="dashboardSidebar" className="min-w-[242px] bg-white h-[100vh] pt-4">
      {sidebarItems.map((item, index) => {
        return (
          <div
            key={index}
            data-cy="sidebarItem"
            onClick={() => {
              router.push(item.pathName);
            }}
            style={{ backgroundColor: `${pathname == item.pathName ? '#1C202414' : '#fff'}` }}
            className={`flex justify-start items-center cursor-pointer`}
          >
            <div className="flex py-2 px-4 text-lg">
              {item.icon}
            </div>
            <p className="text-base text-main font-semibold py-2.5 ">{item.text}</p>
          </div>
        );
      })}
    </aside>
  );
};
