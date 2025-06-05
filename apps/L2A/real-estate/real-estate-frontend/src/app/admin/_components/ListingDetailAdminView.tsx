'use client';

import Image from 'next/image';
import { useState } from 'react';
import BuildingDetails from './BuildingDetails';
import StatusSelect from './StatusSelect';
import { useParams } from 'next/navigation';
import { useGetPostByIdQuery } from '@/generated';
import ListingCard from '@/app/_components/ListingCard';


const ListingDetailAdminView = () => {
  const {id} = useParams();
  const stringId = Array.isArray(id) ? id[0] : id;
  const [status, setStatus] = useState('Хүлээгдэж буй');
  const {data} = useGetPostByIdQuery({
    variables: { _id: id as string }
  });
  return (
    <div  className="bg-gray-100 min-h-screen p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Ерөнхий мэдээлэл</h2>

            <div className="grid grid-cols-2 gap-y-3 text-sm text-gray-800 mb-4">
              <div>
                <p className="text-gray-500">Эзэмшигч</p>
                <p className="font-medium">{data?.getPostById?.ownerName}</p>
              </div>
              <div>
                <p className="text-gray-500">Утасны дугаар</p>
                <p className="font-medium">{data?.getPostById?.number}</p>
              </div>
              <div>
                <p className="text-gray-500">Нэр</p>
                <p className="font-medium">{data?.getPostById?.title}</p>
              </div>
              <div>
                <p className="text-gray-500">Үнэ</p>
                <p className="font-medium">{data?.getPostById?.price?.toLocaleString()}₮</p>
              </div>
              <div>
                <p className="text-gray-500">Талбай</p>
                <p className="font-medium">{data?.getPostById?.size}м²</p>
              </div>
              <div>
                <p className="text-gray-500">Унтлагын өрөө</p>
                <p className="font-medium">{data?.getPostById?.totalRooms} өрөө</p>
              </div>
              <div>
                <p className="text-gray-500">Ариун цэврийн өрөө</p>
                <p className="font-medium">{data?.getPostById?.restrooms} өрөө</p>
              </div>
              <div>
                <p className="text-gray-500">Дулаан зогсоол</p>
                <p className="font-medium">{data?.getPostById?.garage}</p>
              </div>
            </div>

            <div className="text-sm">
              <p className="text-gray-500 mb-1">Дэлгэрэнгүй тайлбар</p>
              <p className="text-gray-800">{data?.getPostById?.description}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Зураг</h2>
            <div className="grid grid-cols-4 gap-2">
              {data?.getPostById?.images?.map((item, i) => (
                <div key={i} className="w-full aspect-[4/3] relative">
                  <Image src={`${item}`} alt="listing" fill className="rounded-md object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-lg font-semibold mb-2">Байршил</h2>
            <p className="text-sm text-gray-500 mb-4">Please tell us the name of the guest...</p>
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-800 mb-2">
              <div>
                <p className="text-gray-500">Дүүрэг</p>
                <p className="font-medium">{data?.getPostById?.location?.district}</p>
              </div>
              <div>
                <p className="text-gray-500">Хот</p>
                <p className="font-medium">{data?.getPostById?.location?.city}</p>
              </div>
            </div>
            <div className="text-sm mt-2">
              <p className="text-gray-500 mb-1">Дэлгэрэнгүй</p>
              <p className="font-medium text-gray-800">{data?.getPostById?.location?.address}</p>
            </div>
          </div>

          <BuildingDetails data={data?.getPostById} />
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm">
        <ListingCard className='w-full h-[350px] ' image={data?.getPostById?.images?.[0]} totalRooms={data?.getPostById?.totalRooms} district={data?.getPostById?.location?.district} city={data?.getPostById?.location?.city} price={data?.getPostById?.price} title={data?.getPostById?.title} restrooms={data?.getPostById?.restrooms} size={data?.getPostById?.size}/>

          <div className="mt-4">
            <label className="text-sm font-medium mb-1 block">Төлөв</label>
            <StatusSelect post={data?.getPostById} id={stringId} value={status} onChange={(newStatus) => setStatus(newStatus)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingDetailAdminView;
