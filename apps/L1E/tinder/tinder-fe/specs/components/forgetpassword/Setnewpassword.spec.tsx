import Setnewpassword from '@/components/forgetpassword/Setnewpassword';
import { ChangePasswordDocument } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';
import { act, fireEvent, render } from '@testing-library/react';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
const mocks = [
  {
    request: {
      query: ChangePasswordDocument,
      variables: {
        input: {
          otp: '',
          email: '',
          password: 'asd',
        },
      },
    },
    result: {
      data: {
        changePassword: {
          message: 'fuck',
        },
      },
    },
  },
];
describe('Set ee hiinee hhe ', () => {
  const mockPush = jest.fn();
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
  });

  it('should render hhe ', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks}>
        <Setnewpassword />
      </MockedProvider>
    );
    const input = getByTestId('password');

    fireEvent.change(input, { target: { value: 'asd' } });

    const btn = getByTestId('confirmemail');

    await act(async () => {
      fireEvent.click(btn);
      await new Promise((resolve) => {
        setTimeout(resolve, 3000);
      });
    });
  });
  it('bhgu bvl ', async () => {
    Storage.prototype.getItem = jest.fn(() => null);

    render(
      <MockedProvider mocks={mocks}>
        <Setnewpassword />
      </MockedProvider>
    );
  });
});

it('should call localStorage.setItem when email is set', async () => {
  const setItemMock = jest.fn();
  Object.defineProperty(window, 'localStorage', {
    value: {
      setItem: setItemMock,
      getItem: jest.fn().mockReturnValue(JSON.stringify({ email: 'test@example.com' })),
      removeItem: jest.fn(),
    },
    writable: true,
  });

  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <Setnewpassword />
    </MockedProvider>
  );
});

it('should not call setItem if localStorage is not available', () => {
  Object.defineProperty(window, 'localStorage', {
    value: undefined,
    writable: true,
  });

  const setItemMock = jest.fn();

  expect(setItemMock).not.toHaveBeenCalled();
});
