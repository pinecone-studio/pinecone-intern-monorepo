import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { HomeButton } from '@/components/HomeButton';
import { AnimationControls } from 'framer-motion';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
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

const sampleProps = {
  isOpen: true,
  svgControls: mockSvgControls,
};

describe('HomeButton', () => {
  usePathname.mockReturnValue('/home');

  it('should render successfully', () => {
    render(<HomeButton {...sampleProps} />);
  });
});
