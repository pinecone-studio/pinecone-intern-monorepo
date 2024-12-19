import { UserInformation } from '../../../src/components/user/UserInformation';
import { render, screen } from '@testing-library/react';

describe('User Information', () => {
  it('should render successfully', () => {
    render(<UserInformation />);
    expect(screen.getByText('Next'));
  });
});
