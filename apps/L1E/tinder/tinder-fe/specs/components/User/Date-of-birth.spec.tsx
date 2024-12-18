import { DateOfBirth } from '@/components/User/DateOfBirth';
import { render, screen } from '@testing-library/react';

describe('Date of birth page component', () => {
  it('should render successfully', () => {
    render(<DateOfBirth />);
    expect(screen.getByText('Next'));
  });
});
