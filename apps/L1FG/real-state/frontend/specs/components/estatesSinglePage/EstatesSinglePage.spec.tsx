import EstateSinglePage from '@/components/estatesSinglePage/EstatesSinglePage';
import { HouseTypeEnum, PostStats } from '@/generated';
import { render } from '@testing-library/react';

describe('Footer', () => {
  it('should render successfully', () => {
    render(
      <EstateSinglePage
        data={{
          __typename: undefined,
          _id: '',
          createdAt: '',
          description: '',
          price: '',
          propertyDetail: {
            __typename: undefined,
            createdAt: undefined,
            details: undefined,
            garage: false,
            houseType: HouseTypeEnum.Apartment,
            images: undefined,
            location: undefined,
            restrooms: 0,
            size: '',
            totalRooms: 0,
            uploadedAt: undefined,
          },
          propertyOwnerId: {
            __typename: undefined,
            _id: '',
            createdAt: undefined,
            email: '',
            isAdmin: false,
            name: '',
            phone: '',
            updatedAt: undefined,
          },
          status: PostStats.Approved,
          title: '',
          updatedAt: '',
        }}
      />
    );
  });
});
