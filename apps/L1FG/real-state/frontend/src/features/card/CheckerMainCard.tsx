import Link from 'next/link';
import Image from 'next/image';
import { AppartmentIcon } from '../../components/ui/icon/Appartment';
import { BedIcon, ShowerIcon, SizeIcon } from '../../components/ui/icon';
import { Post } from '@/generated';

export const MainCard = ({ value }: { value: Post | undefined }) => {
  return (
    <Link className="flex items-center w-full justify-center" href={`/estates/${value?._id}`}>
      <div className="w-[300px] h-[300px] shadow-lg border rounded-lg flex flex-col ">
        <div className="relative w-full h-1/2">
          <Image src={`${value?.propertyDetail.images[0]}`} alt={'townName'} className=" rounded-md object-center overflow-hidden  ]" fill />
        </div>
        <div className="h-1/2 p-4 flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-lg">{value?.price}</span>
            <span>₮</span>
          </div>
          <div className="flex gap-2 items-center">
            <AppartmentIcon />
            <div className="text-muted-foreground line-clamp-1">{value?.title}</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <SizeIcon />
              {value?.propertyDetail.size}
              <>m2</>
            </div>
            <div className="flex gap-2 items-center">
              <BedIcon />
              <div>{value?.propertyDetail.totalRooms}</div>
              <> өрөө</>
            </div>
            <div className="flex gap-2 items-center">
              <ShowerIcon />
              {value?.propertyDetail.restrooms}
              <> өрөө</>
            </div>
          </div>
          <div className="flex gap-2">
            <span className="text-muted-foreground">{value?.propertyDetail.location.city}</span>
            <span className="text-muted-foreground">{value?.propertyDetail.location.district}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
