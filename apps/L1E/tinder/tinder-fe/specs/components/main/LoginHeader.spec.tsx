import LoggedinHeader from '@/components/main/LoggedinHeader';
import { render } from '@testing-library/react';

describe('LoginHeader', () => {
  it('should render nothing too ', () => {
    render(<LoggedinHeader />);
  });
});
