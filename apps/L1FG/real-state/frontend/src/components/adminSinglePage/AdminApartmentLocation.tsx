interface Property {
  property: {
    address: string;
    district: string;
    subDistrict: string;
  };
}

export const AdminApartmentLocation = ({ property }: Property) => {
  return (
    <div className="w-[736px]  p-6 rounded-lg bg-[#fbfbfc] mt-8 ">
      <div>
        <div>
          <p className="text-[20px] font-semibold">Байршил</p>
          <p className="text-[14px] font-normal text-[#71717A] leading-5 mt-2">
            Please tell us the name of the guest staying at the hotel as it appears on the ID that they’ll present at check-in. If the guest has more than one last name, please enter them all.
          </p>
        </div>
        <div className="mt-8 flex gap-2">
          <div className="w-[336px]">
            <p className="text-[#71717A] text-[14px] font-normal leading-5">Дүүрэг</p>
            <p>{property.district}</p>
          </div>
          <div className="w-[336px]">
            <p className="text-[#71717A] text-[14px] font-normal leading-5">Хороо</p>
            <p>{property.subDistrict}</p>
          </div>
        </div>
        <div className="w-[336px] mt-6">
          <p className="text-[#71717A] text-[14px] font-normal leading-5">Дэлгэрэнгүй</p>
          <p>{property.address}</p>
        </div>
      </div>
    </div>
  );
};
