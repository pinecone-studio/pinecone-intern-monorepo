import { PanelLeft } from 'lucide-react';

const Guests = () => {
  return (
    <div>
      <div data-cy="Guests-Page" className="w-screen h-[64px] bg-green-50 flex gap-20  ">
        <PanelLeft />
        <div className="border-2  h-[20px]"></div>
        <h1>Hotels</h1>
      </div>
    </div>
  );
};

export default Guests;
