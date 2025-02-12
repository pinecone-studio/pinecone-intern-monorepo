'use client';

import React from 'react';
import Image from 'next/image';
import { useAuth } from '@/components/providers';
import { useGetPostsByUserIdQuery } from '@/generated';
import EditIcon from '@/components/myEstate/EditIcon';
import TrashIcon from '@/components/myEstate/TrashIcon';

const statusLabelMap: Record<string, string> = {
  PENDING: 'Хүлээгдэж буй',
  APPROVED: 'Зарагдаж байгаа',
  REJECTED: 'Буцаагдсан',
};

const statusStyleMap: Record<string, string> = {
  PENDING: 'bg-[rgba(37,99,235,0.1)] text-[rgba(37,99,235,1)]',
  APPROVED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
};

const MyEstatesPage = () => {
  const { user } = useAuth();
  const { data, loading, error } = useGetPostsByUserIdQuery({
    variables: { input: { propertyOwnerId: user?._id } },
  });

  if (loading || error) {
    return <div>{loading ? 'Loading...' : `Error: ${error?.message || ''}`}</div>;
  }

  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('mn-MN').format(Number(price));
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Миний зарууд</h1>
      <div className="border border-zinc-200 rounded-lg overflow-hidden">
        <div className="flex items-center bg-gray-50 p-4 border-b border-zinc-200">
          <div className="w-16 text-black font-medium border-r border-zinc-200">№</div>
          <div className="flex-[2] text-black font-medium border-r border-zinc-200 px-4">Нэр</div>
          <div className="flex-1 text-black font-medium border-r border-zinc-200 px-4">Төлөв</div>
          <div className="flex-1 text-black font-medium border-r border-zinc-200 px-4">Үнэ</div>
          <div className="w-24 px-4" />
        </div>

        <div>
          {data?.getPosts?.map((post, index) => (
            <div key={post._id} className="bg-white hover:bg-gray-50 border-b border-zinc-200">
              <div className="flex items-center p-4">
                <div className="w-16 text-gray-500 font-medium border-r border-zinc-200">{index + 1}.</div>
                <div className="flex-[2] font-medium flex items-center gap-4 border-r border-zinc-200 px-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                    <Image src={post.propertyDetail.images[0] || '/placeholder.png'} alt={post.title} fill className="object-cover" />
                  </div>
                  {post.title}
                </div>
                <div className="flex-1 border-r border-zinc-200 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-bold inline-block ${statusStyleMap[post.status] || statusStyleMap.REJECTED}`}>
                    {statusLabelMap[post.status] || statusLabelMap.REJECTED}
                  </span>
                </div>
                <div className="flex-1 text-black border-r border-zinc-200 px-4">{formatPrice(post.price)}₮</div>
                <div className="w-24 flex items-center gap-2 px-4" data-testid="action-buttons">
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <EditIcon />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <TrashIcon />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default MyEstatesPage;
