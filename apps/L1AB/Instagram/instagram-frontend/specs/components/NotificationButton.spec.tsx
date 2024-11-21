import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { AnimationControls } from 'framer-motion';
import { NotificationButton } from '@/components/NotificationButton';

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
  it('should render successfully', () => {
    render(<NotificationButton {...sampleProps} />);
    const buttonElement = screen.getByTestId('notif-click');
    expect(buttonElement);

    fireEvent.click(buttonElement);

    expect(mockHandleOpenClose);
  });
});
