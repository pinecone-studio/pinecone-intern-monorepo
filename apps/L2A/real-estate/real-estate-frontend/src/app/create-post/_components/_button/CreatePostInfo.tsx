import { Bath, BedIcon, Maximize } from "lucide-react";

type Props = {
  title: string;
  price: string;
  area: string;
  rooms: string;
  restrooms: string;
  location: string;
};
// eslint-disable-next-line complexity
export const CreatePostInfo = ({ title, price, area, rooms, restrooms, location }: Props) => (
    <div>
      <div className="text-lg text-[#09090B]">{(price ?? 0).toLocaleString()}₮</div>
      <div className="text-sm text-[#52525B]">{title || 'Мэдээлэл байхгүй байна'}</div>
      <div className="flex gap-4 mt-2 text-sm text-[#09090B]">
        <div className="min-w-[30px] flex"><Maximize className="p-1"/> {area || 0} м²</div>
        <div className="min-w-[30px] flex"><BedIcon className="p-1 gap-2"/>{rooms || 0} өрөө</div>
        <div className="min-w-[30px] flex"><Bath className="p-1"/> {restrooms || 0} а.ц.ө</div>
      </div>
      <div className="text-sm text-[#09090B] mt-1 text-[#71717A]">{location || 'Мэдээлэл байхгүй байна'}</div>
    </div>
  );
  