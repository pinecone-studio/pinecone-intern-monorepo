import { Footer } from '@/components/user/search-result/Footer';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Footer', () => {
  it('should render successfully', async () => {
    render(<Footer />);
  });
});
