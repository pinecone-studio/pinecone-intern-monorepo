import Header from '@/components/common/Header';
import { render } from '@testing-library/react';

describe('Header', () => {
  it('should render page', () => {
    render(<Header />);
  });
});
