import { Post, useGetPostsQuery } from '@/generated';
import Image from 'next/image';
import { useState } from 'react';
import { BedIcon, GarageIcon, PhoneICon, ShowerIcon, SizeIcon } from '../ui/icon';
import { AppartmentIcon } from '../ui/icon/Appartment';
import { EstatesSinglePageInformation } from './EstatesSinglePageInformation';
import { EstateSinglePageFilter } from './EstatesSinglePageFilter';

const EstateSinglePage = ({ data }: { data: Post }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = data.propertyDetail.images;
  const { data: allPosts } = useGetPostsQuery();

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className=" w-[1280px] ">
      <div className="flex justify-center">
        <div className="lg:w-2/3 p-4">
          <div className="relative">
            <div className="relative h-[500px] w-full rounded-lg overflow-hidden">
              <Image
                src={images[currentIndex]}
                fill
                style={{ objectFit: 'cover' }}
                alt={`Property image ${currentIndex + 1}`}
                className="transition-opacity duration-500 w-[800px] h-[700px]"
                priority
              />
              <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-black p-2 rounded-md">
                ←
              </button>
              <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-black p-2 rounded-md">
                →
              </button>
            </div>
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
              {images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`relative w-20 h-20 rounded-md overflow-hidden cursor-pointer
                  ${currentIndex === index ? 'ring-2 ring-blue-500' : ''}`}
                >
                  <Image src={image} fill style={{ objectFit: 'cover' }} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="space-y-4">
              <div className="text-gray-600">
                <div className="flex items-center gap-2 ">
                  <AppartmentIcon />
                  <h3 className="text-[#F97316] font-medium">{data.propertyDetail.houseType}</h3>
                </div>
                <h3>{data.title}</h3>
                <div className="flex gap-2">
                  <h3>{data.propertyDetail.location.city} , </h3>
                  <h3>{data.propertyDetail.location.address} , </h3>
                  <h3>
                    {data.propertyDetail.location.subDistrict}-{data.propertyDetail.location.district}
                  </h3>
                </div>
              </div>
              <div className="border-t pt-4 grid grid-cols-2 gap-4 ">
                <div className="flex  items-center gap-2">
                  <div>
                    <AppartmentIcon />
                  </div>
                  <div>
                    <h3 className="text-[#71717A] text-sm">Эзэмшигч:</h3>
                    {data.propertyOwnerId.name}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <PhoneICon />
                  </div>
                  <div>
                    <h3 className="text-[#71717A] text-sm">Утасны дугаар:</h3>
                    {data.propertyOwnerId.phone}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div>
                    <SizeIcon />
                  </div>
                  <div>
                    <h3 className="text-[#71717A] text-sm">Талбай:</h3>
                    {data.propertyDetail.size} m²
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <BedIcon />
                  </div>
                  <div>
                    <h3 className="text-[#71717A] text-sm">Өрөө:</h3>
                    {data.propertyDetail.totalRooms}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <ShowerIcon />
                  </div>
                  <div>
                    <h3 className="text-[#71717A] text-sm">Ариун цэвэрийн өрөө:</h3>
                    {data.propertyDetail.restrooms}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div>
                    <GarageIcon />
                  </div>
                  <div>
                    <h3 className="text-[#71717A] text-sm"> Дулаан зогсоол:</h3>
                    {data.propertyDetail.garage ? 'Тийм' : 'Үгүй'}
                  </div>
                </div>
              </div>
              <div>
                <EstatesSinglePageInformation data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[40px]">
        <div>
          <h3 className="text-2xl font-semibold text-[black]">Төстэй зарууд</h3>
        </div>
        <div className="grid grid-cols-3 mt-[40px]  gap-10">
          {allPosts?.getPosts
            ?.filter((post) => post.propertyDetail.houseType === data.propertyDetail.houseType && post._id !== data._id)
            ?.map((post) => (
              <EstateSinglePageFilter key={post._id} data={post} />
            ))}
        </div>
      </div>
    </div>
  );
};
export default EstateSinglePage;
