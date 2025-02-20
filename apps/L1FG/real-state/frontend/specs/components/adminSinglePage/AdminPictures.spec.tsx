import { AdminPictures } from '@/components/adminSinglePage/AdminPictures';
import { HouseTypeEnum, PostStats } from '@/generated';
import { render } from '@testing-library/react';

describe('AdminPictures', () => {
  it('should render successfully', () => {
    render(
      <AdminPictures
        property={{
          __typename: undefined,
          _id: '',
          title: '',
          description: '',
          price: '',
          status: PostStats.Approved,
          propertyOwnerId: {
            __typename: undefined,
            _id: '',
            name: '',
            email: '',
            phone: '',
            isAdmin: false,
          },
          propertyDetail: {
            __typename: undefined,
            houseType: HouseTypeEnum.Apartment,
            size: '',
            images: ['https://res.cloudinary.com/real-estate-pinecone/image/upload/v17396065…'],
            totalRooms: 0,
            garage: true,
            restrooms: 0,
            location: {
              __typename: undefined,
              address: undefined,
              city: undefined,
              district: undefined,
              subDistrict: undefined,
            },
            details: {
              balcony: true,
              lift: true,
            },
          },
        }}
      />
    );
  });
});
