import { formatPrice } from '@/constants/constant';
import { Post } from '@/generated';

export const EstatesSinglePageInformation = ({ data }: { data: Post }) => {
  const formattedDate = new Date(data.propertyDetail.details?.completionDate).toLocaleString('mn-MN', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div>
      <div>
        <div className="border-t pt-4">
          <div className=" text-gray-900 flex justify-between items-center">
            <h3 className="text-[#71717A] text-sm">Үнэ</h3>
            <h3 className="text-2xl ">{formatPrice(data.price)}</h3>
          </div>
        </div>
        <div className="border-t pt-4">
          <div className=" text-gray-900 flex justify-between items-center">
            <h3 className="text-[#71717A] text-sm">Ашиглалтанд орсон он:</h3>
            <h3>{formattedDate}</h3>
          </div>
        </div>
        <div className="border-t pt-4">
          <div className=" text-gray-900 flex justify-between items-center">
            <h3 className="text-[#71717A] text-sm">Тагт</h3>
            <h3>{data.propertyDetail.details?.balcony ? 'Тийм' : 'Үгүй'}</h3>
          </div>
        </div>
        <div className="border-t pt-4">
          <div className=" text-gray-900 flex justify-between items-center">
            <h3 className="text-[#71717A] text-sm">Цонхны тоо:</h3>
            <h3>{data.propertyDetail.details?.windowsCount}</h3>
          </div>
        </div>
        <div className="border-t pt-4">
          <div className=" text-gray-900 flex justify-between items-center">
            <h3 className="text-[#71717A] text-sm">Цонх</h3>
            <h3>{data.propertyDetail.details?.windowType}</h3>
          </div>
        </div>
        <div className="border-t pt-4">
          <div className=" text-gray-900 flex justify-between items-center">
            <h3 className="text-[#71717A] text-sm">Шал:</h3>
            <h3>{data.propertyDetail.details?.floorMaterial}</h3>
          </div>
        </div>
        <div className="border-t pt-4">
          <div className=" text-gray-900 flex justify-between items-center">
            <h3 className="text-[#71717A] text-sm">Хэдэн давхарт:</h3>
            <h3>{data.propertyDetail.details?.floorNumber}</h3>
          </div>
        </div>
        <div className="border-t pt-4">
          <div className=" text-gray-900 flex justify-between items-center">
            <h3 className="text-[#71717A] text-sm">Нийт давхар:</h3>
            <h3>{data.propertyDetail.details?.totalFloors}</h3>
          </div>
        </div>
        <div className="border-t pt-4">
          <div className=" text-gray-900 flex justify-between items-center">
            <h3 className="text-[#71717A] text-sm">Лифт</h3>
            <h3>{data.propertyDetail.details?.lift ? 'Байгаа' : 'baihgui'}</h3>
          </div>
        </div>
        <div className="border-t pt-4">
          <div className=" text-gray-900 flex justify-between items-center">
            <h3>{data.description}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
