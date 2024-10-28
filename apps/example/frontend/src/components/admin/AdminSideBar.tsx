"use client"
import { usePathname, useRouter } from 'next/navigation';
import { FaRegClipboard, FaGear, FaListUl, FaTags } from "react-icons/fa6";
import { HiMiniSquares2X2 } from "react-icons/hi2";

const sideBarItems = [
    {
        icon: <HiMiniSquares2X2 size={24} />,
        title: 'Хяналтын самбар',
        link: '/admin',
    },
    {
        icon: <FaRegClipboard size={24} />,
        title: 'Захиалга',
        link: '/admin/order',
    },
    {
        icon: <FaTags size={24} />,
        title: 'Орлого',
        link: '/admin/income',
    },
    {
        icon: <FaListUl size={24} />,
        title: 'Бүтээгдэхүүн',
        link: '/admin/product',
    },
    {
        icon: <FaGear size={24} />,
        title: 'Тохиргоо',
        link: '/admin/settings',
    }
];

export const AdminSideBar = () => {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <div className='min-w-56 h-full bg-white py-6 space-y-4'>
            {sideBarItems.map((item, index) => (
                <div
                    key={index}
                    className={`flex gap-4 py-2 px-4 cursor-pointer hover:bg-gray-300 ${pathname === item.link ? 'bg-gray-200 font-bold' : null}`}
                    onClick={() => router.push(item.link)}>
                    {item.icon}
                    <p className='font-semibold'>{item.title}</p>
                </div>
            ))}
        </div>
    );
};
