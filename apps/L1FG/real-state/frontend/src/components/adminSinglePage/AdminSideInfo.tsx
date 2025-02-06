import { SmallHouseIcon } from '@/components/layout/icons/SmallHouseIcon';
import { SizeIcon } from '../layout/icons/SizeIcon';
import { RoomIcon } from '../layout/icons/RoomIcon';
import { BathIcon } from '../layout/icons/BathIcon';

type Status = 'Waiting' | 'Approved' | 'Rejected';

interface Property {
  property: {
    title: string;
    id: string;
    price: string;
    size: string;
    bedrooms: number;
    bathrooms: number;
    status?: Status;
    images: string[];
  };
}

export const AdminSideInfo = ({ property }: Property) => {
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${property.images[0]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          width: 435,
          height: 292,
          borderRadius: '8px 8px 0 0',
        }}
      ></div>
      <div className="w-[435px] p-4 bg-[#fbfbfc] rounded-b-lg">
        <div>
          <p>{property.price}</p>
        </div>
        <div className="flex items-center gap-2 mt-3">
          <SmallHouseIcon />
          <p>{property.title}</p>
        </div>
        <div className="flex gap-4 mt-3">
          <div className="flex gap-2 items-center">
            <SizeIcon />
            <p>{property.size}м²</p>
          </div>
          <div className="flex gap-2 items-center">
            <RoomIcon />
            <p>{property.bedrooms}</p>
          </div>
          <div className="flex gap-2 items-center">
            <BathIcon />
            <p>{property.bathrooms} а.ц.ө</p>
          </div>
        </div>
      </div>
      <div className="w-[435px] mt-4 p-6 rounded-lg bg-[#fbfbfc]">
        <p>Төлөв</p>
        <select defaultValue={property.status} className="py-2 px-3 w-[372px] border border-[#71717A] rounded-sm mt-2">
          <option value="Waiting">Хүлээгдэж буй</option>
          <option value="Approved">Зөвшөөрөх</option>
          <option value="Rejected">Татгалзах</option>
        </select>
      </div>
    </div>
  );
};
