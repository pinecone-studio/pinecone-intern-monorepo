import Link from 'next/link';
import Image from 'next/image';
import { AppartmentIcon } from '../../components/ui/icon/Appartment';
import { BedIcon, ShowerIcon, SizeIcon } from '../../components/ui/icon';
import { Post } from '@/generated';

export const EstateSinglePageFilter = ({ data }: { data: Post }) => {
  return (
    <Link className="flex items-center w-full justify-center" href={`/estates/${data._id}`}>
      <div className="w-[400px] h-[380px] shadow-lg border rounded-lg flex flex-col">
        <Image src={`${data.propertyDetail.images[0]}`} alt={'townName'} className=" w-full rounded-md object-center overflow-hidden ]" height={150} width={300} />
        <div className="h-1/2 p-4 flex flex-col gap-2">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-lg">{data.price}</span>
            <span>₮</span>
          </div>
          <div className="flex gap-2 items-center">
            <AppartmentIcon />
            <div className="text-muted-foreground line-clamp-1 ">{data.title}</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <SizeIcon />
              {data.propertyDetail.size}
              <>m2</>
            </div>
            <div className="flex gap-2 items-center">
              <BedIcon />
              <div>{data.propertyDetail.totalRooms}</div>
              <> өрөө</>
            </div>
            <div className="flex gap-2 items-center">
              <ShowerIcon />
              {data.propertyDetail.restrooms}
              <> өрөө</>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
