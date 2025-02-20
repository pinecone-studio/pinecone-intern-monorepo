'use client';

import { AdminBasicInformation } from '@/components/adminSinglePage/AdminBasicInformation';
import { AdminSideInfo } from './AdminSideInfo';
import { AdminPictures } from './AdminPictures';
import { AdminApartmentLocation } from './AdminApartmentLocation';
import { AdminAboutApartment } from './AdminAboutApartment';
import { GetPostByIdQuery } from '@/generated';

interface AdminSinglePageProps {
  property: GetPostByIdQuery['getPostById'];
}

const AdminSinglePage = ({ property }: AdminSinglePageProps) => {
  return (
    <div>
      <div className="flex gap-6 mt-8">
        <AdminBasicInformation property={property} />
        <AdminSideInfo property={property} />
      </div>
      <AdminPictures property={property} />
      <AdminApartmentLocation property={property} />
      <AdminAboutApartment property={property} />
    </div>
  );
};

export default AdminSinglePage;
