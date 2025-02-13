interface Property {
  name: string;
  title: string;
  id: string;
  price: string;
  size: string;
  bedrooms: number;
  bathrooms: number;
  parking: string;
  phone: string;
  description: string;
}

export const AdminBasicInformation = ({ property }: { property: Property }) => {
  return (
    <div className="max-w-[736px] p-6 bg-[#fbfbfc] rounded-lg ">
      <div className="w-[688px]">
        <h4 className="text-[20px] font-semibold">Ерөнхий мэдээлэл</h4>
      </div>
      <div className="flex gap-4 mt-9 ">
        <div className="w-[336px]">
          <p className="text-[#71717A] text-[14px] font-normal leading-5">Эзэмшигч</p>
          <p>{property.name}</p>
        </div>
        <div>
          <p className="text-[#71717A] text-[14px] font-normal leading-5">Утасны дугаар</p>
          <p>{property.phone}</p>
        </div>
      </div>
      <div className="flex gap-4 mt-6 ">
        <div className="w-[336px]">
          <p className="text-[#71717A] text-[14px] font-normal leading-5">Нэр</p>
          <p>{property.title}</p>
        </div>
        <div>
          <p className="text-[#71717A] text-[14px] font-normal leading-5">Үнэ</p>
          <p>{property.price}</p>
        </div>
      </div>
      <div className="flex gap-4 mt-6 ">
        <div className="w-[336px]">
          <p className="text-[#71717A] text-[14px] font-normal leading-5">Талбай</p>
          <p>{property.size} м²</p>
        </div>
        <div>
          <p className="text-[#71717A] text-[14px] font-normal leading-5">Унталгын өрөө</p>
          <p>{property.bedrooms} </p>
        </div>
      </div>
      <div className="flex gap-4 mt-6 ">
        <div className="w-[336px]">
          <p className="text-[#71717A] text-[14px] font-normal leading-5">Ариун цэвэрийн өрөө</p>
          <p>{property.bathrooms}</p>
        </div>
        <div>
          <p className="text-[#71717A] text-[14px] font-normal leading-5">Дулаан зогсоол</p>
          <p>{property.parking} </p>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-[#71717A] text-[14px] font-normal leading-5">Дэлгэрэнгүй тайлбар</p>
        <p>{property.description}</p>
      </div>
    </div>
  );
};
