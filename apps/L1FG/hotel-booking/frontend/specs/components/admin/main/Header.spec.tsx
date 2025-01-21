import { Header } from '@/components/admin/main/Header';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Header', () => {
  it('should render Header successfully', async () => {
    render(<Header />);
  });
});
