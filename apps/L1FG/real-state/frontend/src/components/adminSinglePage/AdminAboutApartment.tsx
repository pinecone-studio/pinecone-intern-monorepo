import { GetPostByIdQuery } from '@/generated';
import moment from 'moment';
interface AdminSinglePageProps {
  property: GetPostByIdQuery['getPostById'];
}

export const AdminAboutApartment = ({ property }: AdminSinglePageProps) => {
  return (
    <div className="w-[736px]  p-6 rounded-lg bg-[#fbfbfc] mt-8 ">
      <div>
        <div>
          <h4 className="text-[20px] font-semibold">Барлигийн дэлгэрэнгүй</h4>
        </div>

        <div className="flex justify-between mt-8">
          <p>Ашиглалтанд орсон он:</p>
          <p>
            {property?.propertyDetail?.details?.completionDate &&
              moment(property.propertyDetail.details.completionDate).isValid() &&
              moment(property.propertyDetail.details.completionDate).format('YYYY-MM-DD')}
          </p>
        </div>
        <div className="border mt-4"></div>
        <div className="flex justify-between mt-4">
          <p>Цонхны тоо:</p>
          <p>{property?.propertyDetail?.details?.windowsCount}</p>
        </div>
        <div className="border mt-4"></div>
        <div className="flex justify-between mt-4">
          <p>Цонх:</p>
          <p>{property?.propertyDetail.details?.windowType}</p>
        </div>
        <div className="border mt-4"></div>
        <div className="flex justify-between mt-4">
          <p>Хэдэн давхарт:</p>
          <p>{property?.propertyDetail.details?.floorNumber}</p>
        </div>
        <div className="border mt-4"></div>
        <div className="flex justify-between mt-4">
          <p>Барилгын давхар:</p>
          <p>{property?.propertyDetail.details?.totalFloors}</p>
        </div>
        <div className="border mt-4"></div>
        <div className="flex justify-between mt-4">
          <p>Шал:</p>
          <p>{property?.propertyDetail.details?.floorMaterial}</p>
        </div>
        <div className="border mt-4"></div>
        <div className="flex justify-between mt-4">
          <p>Тагт:</p>
          <p>{property?.propertyDetail?.details?.balcony ? 'Байгаа' : 'Байхгуй'}</p>
        </div>
        <div className="border mt-4"></div>
        <div className="flex justify-between mt-4">
          <p>Лифт:</p>
          <p>{property?.propertyDetail.details?.lift ? 'Байгаа' : 'Байхгуй'}</p>
        </div>
        <div className="border mt-4"></div>
      </div>
    </div>
  );
};
