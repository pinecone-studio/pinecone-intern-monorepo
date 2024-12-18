import { DateOfBirth } from '@/components/UserDetails/DateOfBirth';
import { render, screen } from '@testing-library/react';

describe('Date of birth page component', () => {
  it('should render successfully', () => {
    render(<DateOfBirth />);
    expect(screen.getByText('Back'));
  });
});
