import { DateOfBirth } from '@/components/user/DateOfBirth';
import { render, screen } from '@testing-library/react';

describe('Date of birth page ', () => {
  it('should  successfully', () => {
    render(<DateOfBirth />);
    expect(screen.getByText('Next'));
  });
});
