import { InterestSelect } from '@/components/user/InterestSelect';
import { render, screen } from '@testing-library/react';

describe('Interest page component', () => {
  it('should render successfully', () => {
    render(<InterestSelect />);
    expect(screen.getByText('Next'));
  });
});
