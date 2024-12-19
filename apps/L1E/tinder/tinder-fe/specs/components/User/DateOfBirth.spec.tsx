import { DateOfBirth } from '../../../src/components/user/DateOfBirth';
import { render, screen } from '@testing-library/react';

describe('Date of birth page component ', () => {
  it('Should successfully', () => {
    render(<DateOfBirth />);
    expect(screen.getByText('Next'));
  });
});
