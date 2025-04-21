import Header from '@/app/_components/Header';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Faq title', () => {
  it('should render page correctly', async () => {
    render(<Header />);
  });
});
