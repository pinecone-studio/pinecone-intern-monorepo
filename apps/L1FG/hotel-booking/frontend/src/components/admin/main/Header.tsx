import { Panel } from '../svg';

export const Header = () => {
  return (
    <div className="p-4 border-b border-[#E2E8F0] w-full bg-[#F4F4F5] h-[64px] flex items-center">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 pr-2">
          <div className="p-1.5 flex items-center justify-center">
            <Panel />
          </div>
          <div className="w-[1px] h-4 bg-[#E2E8F0]"></div>
        </div>
        {/* <p className="text-[#020617] font-Inter text-sm font-normal">{props.hotels ? 'Hotels' : 'Guests'}</p> */}
      </div>
    </div>
  );
};
