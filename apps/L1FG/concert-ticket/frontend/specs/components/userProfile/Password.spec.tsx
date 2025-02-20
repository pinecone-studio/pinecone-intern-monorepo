import { useAlert } from '@/components/providers/AlertProvider';
import { UserPassword } from '@/components/userProfile/Password';
import { NewPasswordDocument } from '@/generated';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';

jest.mock('@/components/providers/AlertProvider', () => ({
  useAlert: jest.fn(),
}));

const mockPasswordUpdateSuccess: MockedResponse = {
  request: {
    query: NewPasswordDocument,
    variables: {
      input: { newPassword: '111111', oldPassword: '222222', userId: '1' },
    },
  },
  result: {
    data: {
      newPassword: true,
    },
  },
};

const mockPasswordUpdateError: MockedResponse = {
  request: {
    query: NewPasswordDocument,
    variables: {
      input: { newPassword: '111111', oldPassword: '222222', userId: '1' },
    },
  },
  error: new Error('Хуучин нууц үг буруу байна'),
};

describe('UserPassword Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  const mockshowAlert = jest.fn();
  (useAlert as jest.Mock).mockReturnValue({ showAlert: mockshowAlert });

  it('shows warning when passwords do not match', async () => {
    localStorage.setItem('user', JSON.stringify({ _id: '1' }));
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <UserPassword />
      </MockedProvider>
    );

    fireEvent.change(screen.getByTestId('old-password'), { target: { value: '222222' } });
    fireEvent.change(screen.getByTestId('new-password'), { target: { value: '111111' } });
    fireEvent.change(screen.getByTestId('repeat-password'), { target: { value: '000000' } });
    fireEvent.click(screen.getByTestId('save-button'));
    expect(screen.findByText('Шинэ нууц үгийг давтан хийнэ үү')).toBeDefined();
  });

  it('calls mutation and shows success on success', async () => {
    localStorage.setItem('user', JSON.stringify({ _id: '1' }));
    render(
      <MockedProvider mocks={[mockPasswordUpdateSuccess]} addTypename={false}>
        <UserPassword />
      </MockedProvider>
    );

    fireEvent.change(screen.getByTestId('old-password'), { target: { value: '222222' } });
    fireEvent.change(screen.getByTestId('new-password'), { target: { value: '111111' } });
    fireEvent.change(screen.getByTestId('repeat-password'), { target: { value: '111111' } });
    fireEvent.click(screen.getByTestId('save-button'));

    expect(screen.findByText('Нууц үг амжилттай шинэчлэгдлээ')).toBeDefined();
  });

  it('shows error when mutation fails', async () => {
    localStorage.setItem('user', JSON.stringify({ _id: '1' }));

    render(
      <MockedProvider mocks={[mockPasswordUpdateError]} addTypename={false}>
        <UserPassword />
      </MockedProvider>
    );
    await act(async () => {
      fireEvent.change(screen.getByTestId('old-password'), { target: { value: '222222' } });
    });
    await act(async () => {
      fireEvent.change(screen.getByTestId('new-password'), { target: { value: '111111' } });
    });
    await act(async () => {
      fireEvent.change(screen.getByTestId('repeat-password'), { target: { value: '111111' } });
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId('save-button'));
    });
    expect(screen.findByText('Хуучин нууц үг буруу байна')).toBeDefined();
    await waitFor(() => {
      expect(mockshowAlert).toHaveBeenCalledWith('error', 'Хуучин нууц үг буруу байна');
    });
  });
  it('localStorage setitem undifined', async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <UserPassword />
      </MockedProvider>
    );
  });
});
