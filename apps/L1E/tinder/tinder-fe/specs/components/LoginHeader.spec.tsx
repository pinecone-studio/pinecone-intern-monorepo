import LoggedinHeader from '@/components/LoggedinHeader';
import { render } from '@testing-library/react';

describe('LoginHeader', () => {
  it('should render nothing too ', () => {
    render(<LoggedinHeader />);
  });
});
