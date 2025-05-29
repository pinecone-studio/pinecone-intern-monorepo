'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useGetPostByIdQuery, useGetPostsQuery } from '@/generated';
import { User, Phone, Ruler, BedDouble, Bath, Car } from 'lucide-react';
import PostDetailsTable from '../_components/PostDetailsTable';
import RelatedListings from '../_components/RelatedListings';
import PostInfoSection from '../_components/PostInfoSection';
import Image from 'next/image';
import { BuildDetailRows } from '@/lib/build-detail-row';




const PropertyDetailPage = () => {
  const [mainImage, setMainImage] = useState('');
  const { id } = useParams() as { id: string };
  

  const { data: dataById } = useGetPostByIdQuery({ variables: { _id: id } });
  const { data } = useGetPostsQuery();
  const post = dataById?.getPostById;

  const infoItems = [
    { icon: User, label: 'Эзэмшигч', value: 'no' },
    { icon: Phone, label: 'Утасны дугаар', value: post?.number },
    { icon: Ruler, label: 'Талбай', value: `${post?.size}м²` },
    { icon: BedDouble, label: 'Өрөө', value: `${post?.totalRooms} өрөө` },
    { icon: Bath, label: 'Ариун цэврийн өрөө', value: `${post?.restrooms} өрөө` },
    { icon: Car, label: 'Дулаан зогсоол', value: post?.garage ? 'Байгаа' : 'Байхгүй' },
  ];

  const detailRows = BuildDetailRows(post);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
        <Image src={mainImage || dataById?.getPostById?.images?.[0] || '/placeholder.png'} width={800} height={600} alt="Main Property" className=" object-cover rounded-2xl" />
          <div className="flex gap-4 mt-4 flex-wrap ">
            {dataById?.getPostById?.images?.map((src, idx) => (
              <Image
                key={idx}
                src={src || '/placeholder.png'}
                width={100}
                height={100}
                onClick={() => setMainImage(src || '/placeholder.png')}
                alt="Thumbnail"
                className="w-[121px] h-[68px] object-cover rounded-lg cursor-pointer hover:ring-2 hover:ring-orange-500"
              />
            ))}
          </div>

        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-medium">{post?.title}</h1>
            <p className="text-sm text-muted-foreground">
              {post?.location?.city}, {post?.location?.district}, {post?.location?.address}
            </p>
          </div>
          <PostInfoSection items={infoItems} />
          <PostDetailsTable details={detailRows} />
          <p className="text-muted-foreground text-sm w-[400px]">{post?.description}</p>
        </div>
      </div>

      <RelatedListings posts={data?.getPosts } />
    </div>
  );
};

export default PropertyDetailPage;
