'use client';

import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useMeQuery } from '@/generated';
import UserListingTable, { Listing } from './_components/UserListingTable';

const GET_POSTS_BY_USER_ID = gql`
  query GetPostsByUserId($propertyOwnerId: ID!) {
    getPostsByUserId(propertyOwnerId: $propertyOwnerId) {
      _id
      title
      images
      status
      price
      propertyOwnerId
    }
  }
`;

const statuses: Listing['status'][] = ['Хүлээгдэж буй', 'Зарагдаж байгаа', 'Зарагдсан', 'Буцаагдсан', 'Хадгалсан'];

const UserListingPage = () => {
  const [selectedTab, setSelectedTab] = useState('Зарууд');
  const { data: meData } = useMeQuery();
  const userId = meData?.me?.id;

  const { data, loading } = useQuery(GET_POSTS_BY_USER_ID, {
    variables: { propertyOwnerId: userId },
    skip: !userId,
  });

  const posts = data?.getPostsByUserId ?? [];

  type Post = {
    _id: string;
    title: string;
    images?: string[];
    status: string;
    price?: number;
    propertyOwnerId: string;
  };

  const listings: Listing[] = posts.map((post: Post) => {
    const translatedStatus = translateStatus(post.status);
    return {
      id: post._id,
      name: post.title,
      owner: post.propertyOwnerId,
      image: post.images?.[0] ?? '/placeholder.png',
      status: translatedStatus,
      price: post.price ? `${post.price.toLocaleString()}₮` : 'Тодорхойгүй',
    };
  });

  const filteredListings = selectedTab === 'Зарууд' ? listings : listings.filter((l) => l.status === selectedTab);

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Миний зарууд</h1>

      <div className="flex gap-2 mb-4">
        <button onClick={() => setSelectedTab('Зарууд')} className={`px-4 py-1.5 rounded-md text-sm border ${selectedTab === 'Зарууд' ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-50'}`}>
          Зарууд
        </button>
        {statuses.map((tab) => (
          <button key={tab} onClick={() => setSelectedTab(tab)} className={`px-4 py-1.5 rounded-md text-sm border ${selectedTab === tab ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-50'}`}>
            {tab}
          </button>
        ))}
      </div>
      {loading ? (
        <div data-testid="skeleton-loader" className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-10 bg-gray-200 rounded animate-pulse" />
          ))}
        </div>
      ) : (
        <UserListingTable listings={filteredListings} />
      )}
    </div>
  );
};

export default UserListingPage;

function translateStatus(status: string): Listing['status'] {
  const statusMap: Record<string, Listing['status']> = {
    PENDING: 'Хүлээгдэж буй',
    SALE: 'Зарагдаж байгаа',
    SOLD: 'Зарагдсан',
    DECLINED: 'Буцаагдсан',
    SAVED: 'Хадгалсан',
  };
  return statusMap[status?.toUpperCase()] ?? 'Хүлээгдэж буй';
}
