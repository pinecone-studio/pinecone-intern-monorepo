import MainLoader from '@/app/(main)/loading';
import { render } from '@testing-library/react';

describe('Loading page', () => {
  it('should render laoding page', () => {
    render(<MainLoader />);
  });
});
