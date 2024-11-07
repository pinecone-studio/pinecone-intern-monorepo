import ProductEvulation from '@/components/ProductEvulation';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('ProductEvulation', () => {
  it('should render successfully', () => {
    render(<ProductEvulation />);
    const element = screen.getByText('ProductEvulation');
    expect(element)
  });
});
