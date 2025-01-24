import Link from 'next/link';
import { ActiveZap, WhiteCircle, Zap } from '../../../components/admin/svg';

type SidebarLinkProps = {
  href: string;
  isActive: boolean;
  label: string;
};

const SidebarLink = ({ href, isActive, label }: SidebarLinkProps) => (
  <Link href={href} className={`py-1.5 px-2 flex items-center gap-2 rounded-sm ${isActive ? 'bg-[#F4F4F5]' : 'bg-white'}`}>
    {isActive ? <ActiveZap /> : <Zap />}
    <p className={`font-Inter text-sm font-normal ${isActive ? 'text-[#09090B]' : 'text-[#71717A]'}`}>{label}</p>
  </Link>
);

type SidebarType = {
  hotels: string;
  guests: string;
};

export const Sidebar = (props: SidebarType) => (
  <div className="max-w-[240px] min-h-screen w-full bg-white border-r border-[#E2E8F0] flex flex-col">
    <div className="p-2 w-full">
      <div className="p-2 flex gap-2 items-center">
        <div className="p-2 rounded-lg bg-[#2563EB]">
          <WhiteCircle />
        </div>
        <div className="flex flex-col">
          <p className="font-Inter text-sm font-medium text-[#334155]">Pedia</p>
          <p className="font-Inter text-xs font-normal text-[#334155]">Admin</p>
        </div>
      </div>
    </div>
    <div className="p-2 w-full">
      <SidebarLink href="/admin" isActive={!!props.hotels} label="Hotels" />
      <SidebarLink href="/admin/guests" isActive={!!props.guests} label="Guests" />
    </div>
  </div>
);
