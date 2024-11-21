import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { MoreButton } from '@/components/MoreButton';
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
const sampleProps1 = {
  isOpen: false,
  svgControls: mockSvgControls,
};

describe('MoreButton', () => {
  it('should render successfully', () => {
    render(<MoreButton {...sampleProps} />);
  });

  it('should render successfully', () => {
    render(<MoreButton {...sampleProps1} />);
  });
});
