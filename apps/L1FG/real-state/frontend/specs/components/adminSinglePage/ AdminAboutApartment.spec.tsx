import { AdminAboutApartment } from '@/components/adminSinglePage/AdminAboutApartment';
import { HouseTypeEnum, PostStats } from '@/generated';
import { render } from '@testing-library/react';
const propertyData = {
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
      subDistrict: undefined,
    },
    details: {
      __typename: undefined,
      completionDate: '2024-01-01',
      balcony: true,
      lift: true,
    },
  },
};

describe('it should render successfully ', () => {
  it('should render successfully', () => {
    render(<AdminAboutApartment property={propertyData} />);
  });
});
