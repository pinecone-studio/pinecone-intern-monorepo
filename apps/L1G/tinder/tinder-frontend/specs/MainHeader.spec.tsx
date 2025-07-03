import { MainHeader } from '@/components/MainHeader';
import { render } from '@testing-library/react';

describe('Log in page - main header', () => {
  it('renders without crashing', () => {
    render(<MainHeader />);
  });
});
