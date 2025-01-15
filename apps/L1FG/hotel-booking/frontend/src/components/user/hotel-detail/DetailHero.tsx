import Image from 'next/image';

export const DetailHero = () => {
  return (
    <div className="w-[1160px] flex justify-between">
      <Image className="rounded-sm" width={579} height={434.25} src={'/EconomySingleRoom.png'} alt="hotel-img" />
      <div className="w-[577px] grid grid-cols-2 grid-rows-2 gap-1">
        <Image className="rounded-sm" width={286.5} height={214.88} src={'/EconomySingleRoom.png'} alt="hotel-1" />
        <Image className="rounded-sm" width={286.5} height={214.88} src={'/EconomySingleRoom.png'} alt="hotel-1" />
        <Image className="rounded-sm" width={286.5} height={214.88} src={'/EconomySingleRoom.png'} alt="hotel-1" />
        <Image className="rounded-sm" width={286.5} height={214.88} src={'/EconomySingleRoom.png'} alt="hotel-1" />
      </div>
    </div>
  );
};
