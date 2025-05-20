'use client';

import AdminListingTable from './_components/AdminListingTable';
import { MockedProvider } from '@apollo/client/testing';
import { GetPostsDocument, Post, PostStatus, PropertyType } from '@/generated';

const AdminPage = () => {
  const statuses: PostStatus[] = [PostStatus.Pending, PostStatus.Approved, PostStatus.Declined, PostStatus.Sale, PostStatus.Saved, PostStatus.Sold];

  const mockPosts: Post[] = new Array(6).fill(null).map((_, i) => ({
    __typename: 'Post',
    _id: `${i + 1}`.padStart(4, '0'),
    title: `Зар #${i + 1}`,
    propertyOwnerId: `Эзэмшигч ${i + 1}`,
    price: 99000000 + i * 1000,
    number: 1000 + i,
    images: ['/listingcard.png'],
    status: statuses[i],
    location: {
      __typename: 'Location',
      address: `Баянзүрх ${i + 1}-р хороо`,
      city: 'Улаанбаатар',
      district: 'БЗД',
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    feature: [],
    completionDate: null,
    description: `Энэ бол тайлбар #${i + 1}`,
    floorNumber: null,
    garage: null,
    lift: null,
    restrooms: null,
    roofMaterial: null,
    size: null,
    totalFloors: null,
    totalRooms: null,
    windowType: null,
    windowsCount: null,
    balcony: null,
    type: PropertyType.Apartment,
  }));

  const mocks = [
    {
      request: {
        query: GetPostsDocument,
      },
      result: {
        data: {
          getPosts: mockPosts,
        },
      },
    },
  ];

  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      <AdminListingTable />
    </MockedProvider>
  );
};

export default AdminPage;
