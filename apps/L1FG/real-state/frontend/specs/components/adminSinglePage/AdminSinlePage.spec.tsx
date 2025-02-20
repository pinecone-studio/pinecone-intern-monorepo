import AdminSinglePage from '@/components/adminSinglePage/AdminSinglePage';
import { GetPostByIdQuery, HouseTypeEnum, PostStats } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';
import { render } from '@testing-library/react';

interface AdminSinglePageProps {
  property: GetPostByIdQuery['getPostById'];
}

jest.mock('@/components/adminSinglePage/AdminSideInfo', () => ({
  AdminSideInfo: (_props: AdminSinglePageProps) => <div data-testid="side-info">Side Info Mock</div>,
}));

jest.mock('@/components/adminSinglePage/AdminPictures', () => ({
  AdminPictures: (_props: AdminSinglePageProps) => <div data-testid="pictures">Pictures Mock</div>,
}));

jest.mock('@/components/adminSinglePage/AdminApartmentLocation', () => ({
  AdminApartmentLocation: (_props: AdminSinglePageProps) => <div data-testid="location">Location Mock</div>,
}));

const mockProperty = {
  __typename: 'Property',
  _id: 'test-id',
  title: 'Test Property',
  description: 'Test Description',
  price: '100000',
  status: PostStats.Approved,
  propertyOwnerId: {
    __typename: 'User',
    _id: 'user-id',
    name: 'Test User',
    email: 'test@example.com',
    phone: '1234567890',
    isAdmin: false,
  },
  propertyDetail: {
    __typename: 'PropertyDetail',
    houseType: HouseTypeEnum.Apartment,
    size: '1000',
    images: ['https://res.cloudinary.com/real-estate-pinecone/image/upload/v17396065/test.jpg'],
    totalRooms: 2,
    garage: false,
    restrooms: 1,
    location: {
      __typename: 'Location',
      address: 'Test Address',
      city: 'Test City',
      district: 'Test District',
      subDistrict: 'Test SubDistrict',
    },
    details: ['Detail 1', 'Detail 2'],
  },
};

describe('AdminSinglePage', () => {
  it('should render successfully with all child components', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <AdminSinglePage property={mockProperty} />
      </MockedProvider>
    );
  });
});
