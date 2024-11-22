import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { CreateButton } from '@/components/CreateButton';
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

describe('CreateButton', () => {
  it('should render successfully', () => {
    render(<CreateButton {...sampleProps} />);
  });
});
