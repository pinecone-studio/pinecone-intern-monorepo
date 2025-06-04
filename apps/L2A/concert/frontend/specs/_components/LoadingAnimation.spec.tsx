import LoadingAnimation from '@/app/_components/LoadingAnimation';
import { render } from '@testing-library/react';

describe('loading animation', () => {
  it('should render loading animation', () => {
    render(<LoadingAnimation />);
  });
});
