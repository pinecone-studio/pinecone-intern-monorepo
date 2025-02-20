import { AdminSideInfo } from '@/components/adminSinglePage/AdminSideInfo';
import { render, screen } from '@testing-library/react';
import { HouseTypeEnum, PostStats, RequestChangeStatusDocument, RequestChangeStatusMutationVariables } from '@/generated';
import userEvent from '@testing-library/user-event';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
Object.defineProperty(window, 'ResizeObserver', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
});
Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  })),
});
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: matchingMediaQueries.includes(query),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
  })),
});

let matchingMediaQueries: string[] = [];

export function setMatchingMediaQuery(queries: string | string[]): void {
  matchingMediaQueries = Array.isArray(queries) ? queries : [queries];
}

export function resetMatchingMediaQuery(): void {
  matchingMediaQueries = [];
}
const mock: MockedResponse<any, RequestChangeStatusMutationVariables> = {
  request: {
    query: RequestChangeStatusDocument,
    variables: {
      id: 'valid-id', // Ensure a valid id is passed
      input: {
        status: PostStats.Approved, // Set the status to "APPROVED"
      },
    },
  },
  result: {
    data: {
      updatePost: {
        status: PostStats.Approved,
        __typename: 'Post', // Ensure the correct __typename
      },
    },
  },
};

describe('AdminSideInfo', () => {
  it('should render successfully', async () => {
    render(
      <MockedProvider mocks={[mock]}>
        <AdminSideInfo
          property={{
            __typename: undefined,
            _id: 'valid-id',
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
                address: '',
                city: '',
                district: '',
                subDistrict: '',
              },
              details: {
                lift: true,
                balcony: true,
              },
            },
          }}
        />
      </MockedProvider>
    );

    // Simulate selecting the "APPROVED" option
    await userEvent.selectOptions(screen.getByRole('status'), screen.getByRole('approved'));

    const approvedOption = screen.getByRole('approved') as HTMLOptionElement;

    // Ensure the option is selected correctly
    expect(approvedOption.selected).toBe(true);
  }, 10000);
});
