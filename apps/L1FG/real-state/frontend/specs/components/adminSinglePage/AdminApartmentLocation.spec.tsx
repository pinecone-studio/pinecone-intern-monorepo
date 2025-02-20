import { AdminApartmentLocation } from '@/components/adminSinglePage/AdminApartmentLocation';
import { HouseTypeEnum, PostStats } from '@/generated';
import { render } from '@testing-library/react';

describe('AdminApartmentLocation', () => {
  it('should render successfully ', () => {
    render(
      <AdminApartmentLocation
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
            garage: false,
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
