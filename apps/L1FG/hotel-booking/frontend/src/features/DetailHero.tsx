import Image from 'next/image';
import { Hotel } from '@/generated';

export const DetailHero = ({ data }: { data: Hotel | undefined | null }) => {
  let images = data?.images || [];
  const toShow =  images.filter((image) => image !== images[0]);
  return (
    <div className="w-full grid grid-cols-2 justify-center gap-1">
      <Image className="rounded-sm w-full" layout="responsive" width={579} height={434.25} src={images[0]} alt="hotel-img" />
      <div className="w-full grid grid-cols-2 grid-rows-2 gap-1">
        {toShow.map((image)=>{
          return <div className='relative w-full h-full'>
            <Image className="rounded-sm w-full h-full object-cover" layout="responsive" width={286.5} height={214.88} src={image} alt="hotel-1" />
          </div> 
        })}
      </div>
    </div>
  );
};
