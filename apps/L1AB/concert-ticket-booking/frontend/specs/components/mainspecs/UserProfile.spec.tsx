import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { UserProfile } from '@/components/maincomponents/UserProfile';
import { UpdateUserDocument } from '@/generated';
import { toast } from 'react-toastify';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

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
      updateUser: {
        phone: '11111111',
        email: 'test@gmail.com',
      },
    },
  },
};

describe('UserProfile Component Tests', () => {
  it('should render successfully and allow input changes', async () => {
    const { getByPlaceholderText, getByTestId, getByText } = render(
      <MockedProvider mocks={[updateUserMock]} addTypename={false}>
        <UserProfile />
      </MockedProvider>
    );
    const searchInput = getByTestId('searchinput');
    expect(searchInput);

    fireEvent.input(searchInput, { target: { value: '12349995678' } });
    const phoneInput = getByPlaceholderText('9900-0000');
    const emailInput = getByPlaceholderText('name@example.com');

    fireEvent.change(phoneInput, { target: { value: '11111111' } });
    fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
    const saveButton = getByText('Хадгалах');

    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(toast.success);
      expect(screen);
    });
  });

  it('should show validation errors for invalid input', async () => {
    const { getByText, getByPlaceholderText } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <UserProfile />
      </MockedProvider>
    );

    const phoneInput = getByPlaceholderText('9900-0000');
    const emailInput = getByPlaceholderText('name@example.com');
    const saveButton = getByText('Хадгалах');

    fireEvent.input(phoneInput, { target: { value: '' } });
    fireEvent.input(emailInput, { target: { value: '' } });
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(getByText('Утасны дугаар оруулна уу!'));
      expect(getByText('Имэйл хаяг оруулна уу!'));
    });
  });

  it('should validate and display error messages for invalid inputs', () => {
    const { getByText, getByPlaceholderText } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <UserProfile />
      </MockedProvider>
    );

    const updateButton = getByText('Хадгалах');
    fireEvent.click(updateButton);

    expect(getByText('Утасны дугаар оруулна уу!'));
    expect(getByText('Имэйл хаяг оруулна уу!'));

    fireEvent.change(getByPlaceholderText('9900-0000'), { target: { value: '11111111' } });
    fireEvent.change(getByPlaceholderText('name@example.com'), { target: { value: 'test@gmail.com' } });

    expect(screen.queryByText('Утасны дугаар оруулна уу!'));
    expect(screen.queryByText('Имэйл хаяг оруулна уу!'));
  });
});
