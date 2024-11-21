import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { NotificationDrawer } from '@/components/NotificationDrawer';

const mockToggleNotificationDrawer = jest.fn();

const sampleProps = {
  isOpen: true,
  toggleNotificationDrawer: mockToggleNotificationDrawer,
};

const sampleProps1 = {
  isOpen: false,
  toggleNotificationDrawer: mockToggleNotificationDrawer,
};

describe('NotificationDrawer', () => {
  it('should render successfully', () => {
    render(<NotificationDrawer {...sampleProps} />);

    expect(mockToggleNotificationDrawer);
  });

  it('should render successfully', () => {
    render(<NotificationDrawer {...sampleProps1} />);

    expect(mockToggleNotificationDrawer);
  });
});
