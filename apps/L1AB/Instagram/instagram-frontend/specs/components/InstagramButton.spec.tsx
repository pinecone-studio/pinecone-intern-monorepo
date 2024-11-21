import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { InstagramButton } from '@/components/InstagramButton';

const sampleProps = {
  isOpen: true,
};
const sampleProps1 = {
  isOpen: false,
};

describe('InstagramButton', () => {
  it('should render successfully', () => {
    render(<InstagramButton {...sampleProps} />);
  });

  it('should render successfully', () => {
    render(<InstagramButton {...sampleProps1} />);
  });
});
