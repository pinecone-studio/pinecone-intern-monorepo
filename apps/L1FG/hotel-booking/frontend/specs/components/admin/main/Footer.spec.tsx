import { Footer } from '@/components/admin/main/Footer';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Footer', () => {
  it('should render Footer successfully', async () => {
    render(<Footer />);
  });
});
