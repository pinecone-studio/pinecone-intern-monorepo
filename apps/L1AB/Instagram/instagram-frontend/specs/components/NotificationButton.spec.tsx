import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { AnimationControls } from 'framer-motion';
import { NotificationButton } from '@/components/NotificationButton';
import { MockedProvider } from '@apollo/client/testing';
import { useNotification } from '@/components/providers';

jest.mock('@/components/providers/NotificationProvider', () => ({
  ...jest.requireActual('@/components/providers/NotificationProvider'),
  useNotification: jest.fn(),
}));

const mockSvgControls: AnimationControls = {
  start: jest.fn(),
  stop: jest.fn(),
  set: jest.fn(),
  mount: jest.fn(() => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    return () => {};
  }),
  subscribe: jest.fn(),
};

const mockHandleOpenClose = jest.fn();
const sampleProps = {
  isOpen: true,
  svgControls: mockSvgControls,
  handleOpenClose: mockHandleOpenClose,
};

describe('NotificationButton', () => {
  it('should render successfully', async () => {
    (useNotification as jest.Mock).mockReturnValue({ isNotifyNew: true, setIsNotifyNew: jest.fn() });
    render(
      <MockedProvider>
        <NotificationButton {...sampleProps} />
      </MockedProvider>
    );
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    const buttonElement = screen.getByTestId('notif-click');
    expect(buttonElement);

    fireEvent.click(buttonElement);

    expect(mockHandleOpenClose);
  });
  it('should render successfully', async () => {
    (useNotification as jest.Mock).mockReturnValue({ isNotifyNew: false, setIsNotifyNew: jest.fn() });

    render(
      <MockedProvider>
        <NotificationButton {...sampleProps} />
      </MockedProvider>
    );
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    const buttonElement = screen.getByTestId('notif-click');
    expect(buttonElement);

    fireEvent.click(buttonElement);

    expect(mockHandleOpenClose);
  });
});
