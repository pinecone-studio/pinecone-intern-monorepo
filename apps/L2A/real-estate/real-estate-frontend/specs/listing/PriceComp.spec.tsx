import PriceComp from '@/app/listing/_components/PriceComp';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
describe('PriceComp', () => {
  it('should render the price label', () => {
    render(<PriceComp />);
    expect(screen.getByText('Үнэ')).toBeInTheDocument();
  });

  it('should render both price dropdowns', () => {
    render(<PriceComp />);
    expect(screen.getByTestId('price-min')).toBeInTheDocument();
    expect(screen.getByTestId('price-max')).toBeInTheDocument();
  });

  it('should have correct default dropdown labels', () => {
    render(<PriceComp />);
    expect(screen.getByTestId('price-min')).toHaveDisplayValue('Доод');
    expect(screen.getByTestId('price-max')).toHaveDisplayValue('Дээд');
  });
});