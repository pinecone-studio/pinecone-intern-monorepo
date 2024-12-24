import Date from '@/components/profile/Date';
import { render, screen } from '@testing-library/react';

describe('Date component', () => {
  it('Should successfully render ProfileInputForm', () => {
    render(<Date />);

    expect(screen.getByTestId('date'));
  });
});
