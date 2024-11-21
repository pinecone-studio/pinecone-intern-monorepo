import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { ProfileButton } from '@/components/ProfileButton';
import { AnimationControls } from 'framer-motion';

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

describe('ProfileButton', () => {
  it('should render successfully', () => {
    render(<ProfileButton {...sampleProps} />);
  });
});
