'use client';

import { usePathname } from 'next/navigation';

interface Props {
  children: React.ReactNode;
  name: string;
  onClick?: () => void;
  href: string | undefined;
}
const style = {
  notSelected:
    ' group h-12 flex pl-2.5 rounded cursor-pointer stroke-[0.75] dark:text-white  dark:hover:bg-[#131313] hover:stroke-neutral-500 stroke-neutral-800  hover:bg-gray-100 place-items-center gap-3 transition-colors duration-1000 hover:border-0 text-[#09090B]',
  selected:
    'group h-12 flex pl-2.5 items-center flex rounded dark:text-white  cursor-pointer  dark:hover:bg-[#131313] stroke-[0.75] hover:stroke-neutral-500 stroke-neutral-800  hover:bg-gray-100 place-items-center gap-3 transition-colors duration-1000 hover:border-0 text-[#09090B] font-bold',
};
const NavigationLink = ({ children, name, onClick, href }: Props) => {
  const pathname = usePathname();
  return (
    <a onClick={onClick} href={href} className={pathname == href ? style.selected : style.notSelected}>
      {children}
      <p data-testid="name" className=" font-poppins overflow-clip whitespace-nowrap tracking-wide ">
        {name}
      </p>
    </a>
  );
};

export default NavigationLink;
