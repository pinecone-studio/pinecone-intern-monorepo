import { UserProfile } from '@/components/maincomponents/UserProfile';
import { UpdateUserDocument } from '@/generated';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { toast } from 'react-toastify';

const updateUserMock: MockedResponse = {
  request: {
    query: UpdateUserDocument,
    variables: {
      input: {
        phone: '11111111',
        email: 'test@gmail.com',
      },
    },
  },
  result: {
    data: {
      updateUser: { id: '1' },
    },
  },
};
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
  },
}));
describe('UserProfile', () => {
  it('should render successfully and handle input change', async () => {
    const { getByTestId, getByPlaceholderText } = render(
      <MockedProvider mocks={[updateUserMock]} addTypename={false}>
        <UserProfile />
      </MockedProvider>
    );

    const searchInput = getByTestId('searchinput');
    expect(searchInput);

    fireEvent.input(searchInput, { target: { value: '12349995678' } });
    fireEvent.change(getByPlaceholderText('9900-0000'), { target: { value: 11111111 } });
    fireEvent.change(getByPlaceholderText('name@example.com'), { target: { value: 'test@gmail.com' } });
    const UpdateButton = getByTestId('UpdateButton');
    fireEvent.click(UpdateButton);

    expect(searchInput);
    await waitFor(() => {
      expect(toast.success('Таны мэдээлэл амжилттай шинэчлэгдсэн'));
    });
  });
  it('should render successfully and handle input change', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[updateUserMock]} addTypename={false}>
        <UserProfile />
      </MockedProvider>
    );

    const searchInput = getByTestId('searchinput');
    expect(searchInput);

    fireEvent.input(searchInput, { target: { value: '1234wwwqq5678' } });
    expect(searchInput);
    await waitFor(() => {
      expect(toast.success('Таны мэдээлэл амжилттай шинэчлэгдсэн'));
    });
  });
});
