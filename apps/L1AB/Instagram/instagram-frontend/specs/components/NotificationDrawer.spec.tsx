import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { NotificationDrawer } from '@/components/NotificationDrawer';
import { useUser } from '@/components/providers';
import { MockedProvider } from '@apollo/client/testing';
jest.mock('@/components/providers', () => ({
  ...jest.requireActual('@/components/providers'),
  useUser: jest.fn(),
}));
const mockToggleNotificationDrawer = jest.fn();
jest.mock('@/components/providers', () => ({
  ...jest.requireActual('@/components/providers'),
  useUser: jest.fn(),
}));
const sampleProps = {
  isOpen: true,
  toggleNotificationDrawer: mockToggleNotificationDrawer,
};

const sampleProps1 = {
  isOpen: false,
  toggleNotificationDrawer: mockToggleNotificationDrawer,
};
beforeEach(() => {
  useUser.mockImplementation(() => ({
    user: { _id: '123', name: 'John Doe' },
  }));
});
describe('NotificationDrawer', () => {
  it('should render successfully', () => {
    render(
      <MockedProvider>
        <NotificationDrawer {...sampleProps} />
      </MockedProvider>
    );

    expect(mockToggleNotificationDrawer);
  });

  it('should render successfully', () => {
    render(
      <MockedProvider>
        <NotificationDrawer {...sampleProps1} />
      </MockedProvider>
    );

    expect(mockToggleNotificationDrawer);
  });
});
