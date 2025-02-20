import { AdminBasicInformation } from '@/components/adminSinglePage/AdminBasicInformation';
import { HouseTypeEnum, PostStats } from '@/generated';
import { render } from '@testing-library/react';

describe('AdminBasicInformation', () => {
  it('should render successfully', () => {
    render(
      <AdminBasicInformation
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
            images: [],
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
            details: undefined,
          },
        }}
      />
    );
  });
});
