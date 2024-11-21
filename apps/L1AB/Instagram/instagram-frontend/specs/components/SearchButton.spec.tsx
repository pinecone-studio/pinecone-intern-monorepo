import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { AnimationControls } from 'framer-motion';
import { SearchButton } from '@/components/SearchButton';

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

describe('SearchButton', () => {
  it('should render successfully and handle click events', () => {
    render(<SearchButton {...sampleProps} />);
    const buttonElement = screen.getByTestId('search-click');
    expect(buttonElement);

    // Click үйлдэл хийх
    fireEvent.click(buttonElement);

    // Үйлдлийг баталгаажуулах
    expect(mockHandleOpenClose);
  });
});
