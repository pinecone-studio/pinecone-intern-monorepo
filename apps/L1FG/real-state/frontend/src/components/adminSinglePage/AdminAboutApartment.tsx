interface PropertyInfoProps {
  completionDate: string;
  windowsCount: number;
  windowType: string;
  floorNumber: number;
  totalFloors: number;
  floorMaterial: string;
  balcony: boolean;
  lift: boolean;
}

export const AdminAboutApartment = ({ propertyInfo }: { propertyInfo: PropertyInfoProps }) => {
  return (
    <div className="w-[736px]  p-6 rounded-lg bg-[#fbfbfc] mt-8 ">
      <div>
        <div>
          <h4 className="text-[20px] font-semibold">Барлигийн дэлгэрэнгүй</h4>
        </div>

        <div className="flex justify-between mt-8">
          <p>Ашиглалтанд орсон он:</p>
          <p>{propertyInfo.completionDate}</p>
        </div>
        <div className="border mt-4"></div>
        <div className="flex justify-between mt-4">
          <p>Цонхны тоо:</p>
          <p>{propertyInfo.windowsCount}</p>
        </div>
        <div className="border mt-4"></div>
        <div className="flex justify-between mt-4">
          <p>Цонх:</p>
          <p>{propertyInfo.windowType}</p>
        </div>
        <div className="border mt-4"></div>
        <div className="flex justify-between mt-4">
          <p>Хэдэн давхарт:</p>
          <p>{propertyInfo.floorNumber}</p>
        </div>
        <div className="border mt-4"></div>
        <div className="flex justify-between mt-4">
          <p>Барилгын давхар:</p>
          <p>{propertyInfo.totalFloors}</p>
        </div>
        <div className="border mt-4"></div>
        <div className="flex justify-between mt-4">
          <p>Шал:</p>
          <p>{propertyInfo.floorMaterial}</p>
        </div>
        <div className="border mt-4"></div>
        <div className="flex justify-between mt-4">
          <p>Тагт:</p>
          <p>{propertyInfo.balcony ? 'Тийм' : 'Үгүй'}</p>
        </div>
        <div className="border mt-4"></div>
        <div className="flex justify-between mt-4">
          <p>Лифт:</p>
          <p>{propertyInfo.lift ? 'Байгаа' : 'Байхгуй'}</p>
        </div>
        <div className="border mt-4"></div>
      </div>
    </div>
  );
};
