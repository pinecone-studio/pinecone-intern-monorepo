'use client';
import { usePathname, useRouter } from 'next/navigation';
import { ContentPaste, Report, Tag, Window } from './SVG';

export const sidebarItems = [
  { text: 'Нүүр хуудас', icon: <Window />, pathName: '/' },
  { text: 'Ажилчид', icon: <ContentPaste />, pathName: '/employee-details' },
  { text: 'Чөлөө', icon: <Report />, pathName: '/leaving' },
  { text: 'Ажлын зар', icon: <Tag />, pathName: '/recruiting' },
];

export const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  if (pathname === '/login') {
    return null;
  }

  return (
    <aside
      data-cy="dashboardSidebar"
      className="flex md:flex-col md:min-w-[242px] min-w-fit  md:h-screen h-fit  md:pt-4 border-r border-[#ECEDF0] justify-between md:justify-start  flex-wrap"
    >
      {sidebarItems.map((item, index) => {
        return (
          <div
            key={index}
            data-cy="sidebarItem"
            onClick={() => {
              router.push(item.pathName);
            }}
            style={{ backgroundColor: `${pathname == item.pathName ? '#1C202414' : '#fff'}` }}
            className={`flex justify-start items-center cursor-pointer pr-5 w-1/2 md:w-full`}
          >
            <div className="flex py-2 px-4 text-lg">{item.icon}</div>
            <p className="text-base text-main font-semibold py-2.5 ">{item.text}</p>
          </div>
        );
      })}
    </aside>
  );
};
