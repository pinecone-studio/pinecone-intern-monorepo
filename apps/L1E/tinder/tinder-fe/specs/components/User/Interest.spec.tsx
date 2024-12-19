import { render, screen } from '@testing-library/react';
import { InterestSelect } from '@/components/user/InterestSelect';

describe('Interest page component', () => {
  it('should render successfully', () => {
    render(<InterestSelect />);
    expect(screen.getByText('Next'));
  });
});
