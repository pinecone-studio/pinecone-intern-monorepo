import Image from 'next/image';

export const DetailHero = () => {
  return (
    <div className="w-full grid grid-cols-2 justify-center gap-1">
      <Image className="rounded-sm w-full" layout="responsive" width={579} height={434.25} src={'/EconomySingleRoom.png'} alt="hotel-img" />
      <div className="w-full grid grid-cols-2 grid-rows-2 gap-1">
        <Image className="rounded-sm w-full" layout="responsive" width={286.5} height={214.88} src={'/EconomySingleRoom.png'} alt="hotel-1" />
        <Image className="rounded-sm w-full" layout="responsive" width={286.5} height={214.88} src={'/EconomySingleRoom.png'} alt="hotel-1" />
        <Image className="rounded-sm w-full" layout="responsive" width={286.5} height={214.88} src={'/EconomySingleRoom.png'} alt="hotel-1" />
        <Image className="rounded-sm w-full" layout="responsive" width={286.5} height={214.88} src={'/EconomySingleRoom.png'} alt="hotel-1" />
      </div>
    </div>
  );
};
