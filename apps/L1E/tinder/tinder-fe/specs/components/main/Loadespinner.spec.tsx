import LoaderSpinner from '@/components/main/LoaderSpinner';
import { render, screen } from '@testing-library/react';

describe('LoaderSpinner', () => {
  it('should render return', () => {
    render(<LoaderSpinner />);
    expect(screen.getByText('Please Wait...'));
  });
});
