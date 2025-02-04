import { AdminBasicInformation } from '@/components/adminSinglePage/AdminBasicInformation';
import { AdminSideInfo } from './AdminSideInfo';
import { AdminPictures } from './AdminPictures';
import { AdminApartmentLocation } from './AdminApartmentLocation';
import { AdminAboutApartment } from './AdminAboutApartment';
import { Property } from './types';
import { PropertyInfoProps } from './types';

const propertyInfoData: PropertyInfoProps = {
  completionDate: '2012',
  windowsCount: 4,
  windowType: 'Төмөр вакум',
  floorNumber: 4,
  totalFloors: 16,
  floorMaterial: 'Ламинат',
  balcony: true,
  lift: true,
};

const propertyData: Property = {
  name: 'E.Berhee',
  title: 'Soeet apartment',
  id: '0717233',
  price: '200,000,000₮',
  size: '200',
  bedrooms: 4,
  bathrooms: 2,
  parking: 'Байгаа',
  phone: '99112233',
  description: 'Энэхүү барилга нь 2020 онд баригдсан бөгөөд 2021 онд ашиглагдсан байна.',
  images: ['/cover.png', '/cover.png', '/cover.png', '/cover.png', '/cover.png', '/cover.png'],
  district: 'Хан-Уул',
  subDistrict: '1-р дүүрэг',
  address: 'Зайсан толгойн урд, америк сургуулийн хажууд',
};

const AdminSinglePage = () => {
  return (
    <div>
      <div className="flex gap-6 mt-8">
        <AdminBasicInformation property={propertyData} />
        <AdminSideInfo property={propertyData} />
      </div>
      <AdminPictures property={propertyData} />
      <AdminApartmentLocation property={propertyData} />
      <AdminAboutApartment propertyInfo={propertyInfoData} />
    </div>
  );
};

export default AdminSinglePage;
